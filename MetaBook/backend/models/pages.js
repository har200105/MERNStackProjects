const mongoose = require('mongoose');
const {Schema} = mongoose;


const pageSchema = mongoose.Schema({

    pageName:{
        type:String,
        required:true
    },

    pagePosts:[{
        type:Schema.Types.ObjectId,
        ref:"pagePosts"
    }],

    pageCreatedBy:{
       type:Schema.Types.ObjectId,
       ref:"User" 
    },

    pagePicture:{
        type:String
    },

    pageCoverPicture:{
        type:String
    },

    pageBio:{
        type:String
    },

    pageCategory:{
        type:String
    }
    
},{timestamps:true});


const Page = mongoose.model("pages",pageSchema);
module.exports = Page;