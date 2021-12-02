const mongoose = require('mongoose');
const {Schema} = mongoose;

const pagePostSchema = mongoose.Schema({

    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
    caption:{
        type:String,
        max:200
    },
    
    image:{
        type:String
    },
    
    likes:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    comments:[{
        commentedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
            required:true
        },
        likes:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }],
        replies:[{
            repliedBy:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            reply:{
                type:String,
                required:true
            },
            likes:[{
                type:Schema.Types.ObjectId,
                ref:"User"
            }],
        }]
    }]

},{timestamps:true});

const PagePosts = mongoose.model("pagePosts",pagePostSchema);
module.exports = PagePosts;