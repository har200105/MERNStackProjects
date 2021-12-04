const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    
    conversationId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"conversation"
    },

    sender:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },

    text:{
        type:String,
        required:true
    }

},{timestamps:true});

const Message = mongoose.model("message",messageSchema);
module.exports = Message;