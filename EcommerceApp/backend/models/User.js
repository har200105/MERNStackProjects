const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);