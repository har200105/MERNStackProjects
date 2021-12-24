const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const userSchema = mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
    
    Address:{
        type:String,
        required:true
    },
    
    Email:{
        type:String,
        required:true
    },

    MobileNumber:{
        type:String,
        required:true
    },


    foodOrders:{
        type:Schema.Types.ObjectId,
        ref:"Foods"
    },

    restaurantOwner:{
        type:Boolean,
        default:false
    }


},{timestamps:true});

const User = mongoose.model('foods',userSchema);

module.exports = User;