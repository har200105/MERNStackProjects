const mongoose = require("mongoose");
const {Schema} = mongoose;

const videoSchema = mongoose.Schema({
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    filePath: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],
    comment:[{
      type:String,
      commentedBy:{
        type:String
      }
    }]
  },
  { timestamps: true }
);

const Video = mongoose.model("Videos", videoSchema);
module.exports = Video;
