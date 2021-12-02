const mongoose = require('mongoose');
const {Schema} = mongoose;

const groupSchema = mongoose.Schema({

    groupName:{
        type:String,
        required:true
    },

    groupMembers:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],

    groupPosts:[{
        type:Schema.Types.ObjectId,
        ref:"GroupPosts"
    }],

    admins:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],


},{timestamps:true});

const Group = mongoose.model("Groups",groupSchema);
module.exports = Group;