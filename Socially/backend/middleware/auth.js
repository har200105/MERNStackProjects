const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      return res.status(401).json({
        message: "You are not authorized to do this dd",
      });
    }
    const user = await jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = await User.findById(user._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
    isAuthenticated
}