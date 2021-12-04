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
    following:[{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    followers:[{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    profilePicture: {
        type: String
    },
    coverPicture: {
        type: String
    },
    bio:{
        type:String
    },

    isOnline:{
        type:Boolean,
        default:false
    },
    // notifications:{
    //     notifyingText:String,
    //     notifyingImage:String,
    //     notifyingTime:Date
    // }

}, { timestamps: true });

const User = mongoose.model("User",userSchema);
module.exports = User;