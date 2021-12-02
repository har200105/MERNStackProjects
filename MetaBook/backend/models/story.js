const mongoose = require('mongoose');
const {Schema} = mongoose;

const storySchema = mongoose.Schema.Types({
    storyPic:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Story = mongoose.model("stories",storySchema);
module.exports = Story;