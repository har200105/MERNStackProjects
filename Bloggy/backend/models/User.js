const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],

    profilePicture:{
        type:String,
        default:"https://image.shutterstock.com/image-vector/profile-picture-avatar-icon-vector-260nw-1760295569.jpg"
    }
    
});


const User = mongoose.model("User",userSchema);
module.exports = User;