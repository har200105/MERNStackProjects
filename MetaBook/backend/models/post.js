const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
    
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
    caption:{
        type:String,
    },
    
    image:{
        type:String
    },
    
    likes:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],

    comments:[{
        commentedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
            required:true
        }
    }],






},{timestamps:true});


const Post = mongoose.model("posts",postSchema);
module.exports = Post;