const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    members:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }]
});

const Conversation = mongoose.model("conversation",conversationSchema);
module.exports = Conversation;