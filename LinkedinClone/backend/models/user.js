const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    pic: {
        type: String,
    },

    bio:{
        type: String,
    },


    notifications:[{
        type:ObjectId,
        ref:"Notifications"
    }],
    
    connections: [{ type: ObjectId, ref: "User" }],
})

const User = mongoose.model("User", userSchema);

module.exports = User;