const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = mongoose.Schema({

    notificationType:{
        type:String,
        enum:["connection","viewed"]
    },

    notificationForUser:{
        type:ObjectId,
        ref:"User"
    },

    notificationBy:{
        type:ObjectId,
        ref:"User"
    },

    notificationDescription:{
        type:String,
        required:true
    },

    seen:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

const Notification = mongoose.model("Notifications",notificationSchema);
module.exports = Notification;