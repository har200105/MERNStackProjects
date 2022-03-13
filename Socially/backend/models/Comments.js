const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    commentedText: {
        type: String,
        required:true
    },
    isReply: {
        type: Boolean,
        default:false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;