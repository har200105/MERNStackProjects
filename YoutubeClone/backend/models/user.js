const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password:{
      type:String,
      required:true
    },
    about: {
      type: String,
    },
    subscribers: [{
      type:mongoose.SchemaTypes.ObjectId,
      ref:"User"
    }],
    photo: {
      data: Buffer,
      contentType: String,
    },
    notifications:{
      notifyingtext:String,
      notifyingtime:Date,
      notifyingimage:String
    }
  },{ timestamp: true });

const User = mongoose.model("User", userSchema);
module.exports = User;