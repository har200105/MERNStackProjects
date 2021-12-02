const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    pendingFriendRequests:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    sendFriendRequests:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    profilePicture: {
        type: String
    },
    coverPicture: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    bio:{
        type:String
    },

    country:{
        type:String
    },

    city:{
        type:String
    },

    dateOfBirth:{
        type:Date
    },

    notifications:{
        notifyingText:String,
        notifyingImage:String,
        notifyingTime:Date
    }

}, { timestamps: true });

const User = mongoose.model("user",userSchema);
module.exports = User;