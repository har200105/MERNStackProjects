const User = require("../models/user");
const jwt = require("jsonwebtoken");
const b = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.findOne({ email }).exec(async(err, user) => {
    if(err){
      console.log("Naiki Ki Raahoooo Peh Chal ..... !!");
    }
    if (user) {
      return res.status(201).json({
        error: "Email is already been used",
      });
    }
    const newUser = new User({ name, email, password });
    await newUser.save((err, success) => {
      if (err) {
        return res.status(201).json({
          error: err,
        });
      }
      res.status(201).json({
        message: "Signup success! Please signin xD OP Shiddat !!",
      });
    });
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "User with this email does not exist !! Please signup !!",
    });
  } else {
    await b.compare(password, user.password).then(async (u) => {
      if (u) {

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const { _id, name, email } = user;
        res.cookie("token", token, {
          expiresIn: "1d",
        });
        return res.status(201).json({
          token,
          user: { _id, name, email },
        });
        
      } else {
        return res.status(201).json({
          error: "User with this email and password does not exist !!",
        });
      }
    })
  }

}

    

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Success !!",
  });
};
