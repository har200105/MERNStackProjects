const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

//   let userPattern = new RegExp("^" + req.body.query);
//  const users =  await User.find({$and:[{ name: { $regex: userPattern }},
//     {$or:[{$not:{_id:{$in:[req.user.blockedBy]}}},{$not:{_id:{$in:[req.user.blockedUsers]}}}]}]})
// let s = [];
  const users = await User.find(keyword).find({_id: { $ne:[ req.user._id]}});
  console.log(users.length)


  // for(var i=0;i<users.length;i++){
  //   if(!(req.user.blockedUsers.includes(users[i]._id)) &&
  //    !(req.user.blockedBy.includes(users[i]._id))){
  //     s.push(users[i]);
  //   }else{

  //   }
  // }

  // console.log(s)

  // await users.forEach(async(d)=>{
  //   await User.find({$or:[{d:{$in:[req.user.blockedUsers]}},{d:{$in:[req.user.blockedBy]}}]})
  //   .then((sp)=>{
  //     ubs.push(sp)
  //   })
  // });





  // console.log(users);
  res.status(201).json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user)

  if (user && (await user.matchPassword(password))) {
    console.log(user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const blockUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      blockedUsers: req.params.id
    }
  }).then(async(a) => {
    await User.findByIdAndUpdate(req.params.id, {
      $push: {
        blockedBy: req.user._id
      }
    }).then((s) => {
      res.status(201).json(s)
    })
  })

});



const unblockUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      blockedUsers: req.params.id
    }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      blockedBy: req.user._id
    }
  })
});

module.exports = { allUsers, registerUser, authUser, blockUser, unblockUser };
