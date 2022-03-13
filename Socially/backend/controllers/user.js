const User = require("../models/User");
const Post = require("../models/Post");
const { sendForgetPasswordMail, sendVerificationEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({
    $and: [{ _id: { $ne: req.user._id } },
      { blockedBy: { $nin: [req.user._id] } }, { blockedUsers: { $nin: [req.user._id] } },
      { verified: true }]
  });
  console.log(users);
  res.status(201).json(users);
}

const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    
    let myCloud;
    if (avatar) {
      myCloud = await cloudinary.v2.uploader.upload(avatar, {
         folder: "posts",
    });
   }
    console.log("MyCloud");
    console.log(myCloud);
    const token = crypto.randomBytes(32).toString('hex');
    user = await User.create({
      name,
      email,
      password,
      emailVerificationToken:token,
      avatar: myCloud && { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    sendVerificationEmail(user.email,token);
    res.status(201).json({
      success: true,
      message:"Signup Success,Please check you email and verify your account"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");
    if (!user || !user.verified) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).json({
      success: true,
      user,
      token,
      message:"Login Success"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const followUser = async (req, res) => {
  try {
    console.log(req.user._id);
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const verifyUser = async (req, res) => {
  try {
    console.log(req.params);
    const { token } = req.params;
    const user = await User.findOne({ emailVerificationToken: token });
    if (user) {
      user.verified = true;
      user.emailVerificationToken = null;
      await user.save();
      res.status(201).json({ message: "User Verififed Successfully" });
    } else {
      return res
        .json({ success: false, message: "Invalid URL or expired Token" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid URL or expired Token",
    });
  } 
}

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
      verified:true
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const forgotPassword = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    console.log(resetPasswordToken);

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {

      await sendForgetPasswordMail(
      user.email,
      resetPasswordToken
      );

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });

    } catch (error) {
      console.log("....def");
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.log("....");
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "postedBy likes comments.user comments.replies.repliedBy"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user postedBy"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const blockUser = async (req, res) => {

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      blockedUsers: req.params.id
    }
  }).then(async(a) => {
    await User.findByIdAndUpdate(req.params.id, {
      $push: {
        blockedBy: req.user._id
      }
    },{new:true}).then((s) => {
      console.log(s)
      res.status(201).json(s)
    })
  })

};



const unblockUser = async (req, res) => {
  console.log(req.params.id + "wef");
  console.log(req.user._id + "qece");
  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      blockedUsers: req.params.id
    }
  }).then(async (a) => {

    console.log("A");
    console.log(a)

    await User.findByIdAndUpdate(req.params.id, {
      $pull: {
        blockedBy: req.user._id
      }
    }).then((s) => {
      console.log(s)
      res.status(201).json(s)
    })
  });
}

module.exports = {
  register,
  login,
  unblockUser,
  blockUser,
  deleteMyProfile,
  getAllUsers,
  getUserPosts,
  getMyPosts,
  resetPassword,
  forgotPassword,
  myProfile,
  getUserProfile,
  followUser,
  updatePassword,
  updateProfile,
  allUsers,
  verifyUser
};