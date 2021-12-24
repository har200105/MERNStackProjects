const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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

    isFaculty:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },


    isStudent:{
        type:Boolean,
        default:true
    },

    examsGiven:[{
        type:ObjectId,
        ref:"Exam"
    }]

});

const User = mongoose.model("User",userSchema);
module.exports =  User;