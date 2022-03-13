const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(authorization, process.env.JWT_SECRET);
  req.user = await User.findOne({_id:decodedData.id,verified:true});
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
