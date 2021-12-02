const cloudinary = require('cloudinary');
const formidable = require('formidable');
const Post = require('../models/Post');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const addPost = async (req, res) => {
  console.log(req.body)
  const { category, desc, title ,file} = req.body;
  if(file){
  const imgurl = cloudinary.v2.uploader.upload(req.body.file, {
    folder: "Shiddat",
    width: 150,
    crop: "scale"
  }).then(async (s) => {
    console.log(s);
    if (!desc || !title) {
      return res.status(401).json({ message: "Please Add All The Feilds" });
    } else {
      const newPost = Post({
        category,
        photo: s.secure_url,
        desc,
        title,
        postedBy: req.user._id,
      });

      console.log(imgurl.secure_url);

      await newPost.save().then((s) => {
        console.log(s);
        res.status(201).json(s)
      })
    }
  });
  }else{
    const newPost = Post({
      category,
      desc,
      title,
      postedBy: req.user._id,
    });
    await newPost.save().then((s) => {
      console.log(s);
      res.status(201).json(s)
    })

  }
  try {

  } catch (e) {
    res.status(401).json(e)
  }
}


const getPost = async (req, res) => {
  try {
    if (req.query.category) {
      console.log(req.query);
      const { category } = req.query
      await Post.find({ category: category })

        .populate("postedBy", "name email profilePicture")
        .populate("category", "name")
        .limit(15)

        .then((p) => {
          return res.status(201).json(p);
        })
    } else {
      await Post.find({})
        .populate("postedBy", "name email profilePicture")
        .populate("category", "name")
        .then((p) => {
          console.log(p)
          res.status(201).json(p);
        })
    }
  } catch (e) {
    res.status(401).json(e);
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id, { new: true }).then(() => {
      console.log("Blog Deleted Successfully");
      res.status(201).json({ message: "Blog Deleted Successfully" });
    })
  } catch (e) {
    res.status(401).json(e);
  }
}

const editPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body
    })
  } catch (e) {
    res.status(401).json(e);
  }
}


const getPostById = async (req, res) => {
  try {
    await Post.findById(req.params.id)
      .populate("postedBy", "name email profilePicture")
      .populate("category", "name")
      .populate("comments.commentedBy","name email profilePicture")
      .then((p) => {
        return res.status(201).json(p);
      });
  } catch (e) {
    res.status(422).json(e)
  }
}

const getUserPosts = async (req, res) => {
  try {
    await Post.find({ postedBy: req.user._id })
      .populate("category", "name")
      .populate("postedBy", "name email profilePicture")
      .then((ps) => {
        res.status(201).json(ps);
      })
  } catch (e) {
    res.status(422).json(e)
  }
}

const otherPosts = async (req, res) => {
  try {
    await Post.find({ postedBy: req.params.id })
      .populate("category", "name")
      .populate("postedBy", "name email profilePicture")
      .then((ps) => {
        res.status(201).json(ps);
      })
  } catch (e) {
    res.status(422).json(e)
  }
}

const likePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        likes: req.user._id
      }
    }, { new: true })
    .populate("postedBy", "name email profilePicture")
    .populate("category", "name")
    .populate("comments.commentedBy","name email profilePicture")
      .then((d) => {
        res.status(201).json(d)
      })
  } catch (e) {
    res.status(422).json(e)
  }
}


const dislikePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
        likes: req.user._id
      }
    }, { new: true })
    .populate("postedBy", "name email profilePicture")
    .populate("category", "name")
    .populate("comments.commentedBy","name email profilePicture")
      .then((d) => {
        res.status(201).json(d)
      })
  } catch (e) {
    res.status(422).json(e)
  }
}


const comment = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: {
          commentedText: req.body.commentText,
          commentedBy: req.user._id
        }
      }
    }, { new: true })
      .populate("postedBy", "name email profilePicture")
      .populate("category", "name")
      .populate("comments.commentedBy","name email profilePicture")
      .then((com) => {
        res.status(201).json(com);
      })
  } catch (e) {
    res.status(422).json(e)
  }
}






module.exports = {
  editPost, deletePost, addPost, getPost, getPostById, getUserPosts, otherPosts,
  likePost, dislikePost, comment
};