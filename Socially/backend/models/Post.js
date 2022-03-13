const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,
  image: {
    public_id: String,
    url: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  comments: [{
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    commentedText: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    replies: [{
      repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      commentedText: {
        type: String
      },
    }]
  }],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;