const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        commentedText: String,
        commentedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);

module.exports = Post;