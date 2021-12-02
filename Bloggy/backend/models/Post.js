const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  comments: [{
    commentedText: String,
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  }]
},
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;