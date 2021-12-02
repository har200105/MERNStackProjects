const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const orderSchema = mongoose.Schema({
    foodOrdered:[{
        type:Schema.Types.ObjectId,
        ref:"Food"
    }],
    OrderedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    Fromrestaurant:{
        type:Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    shippingDetails:{
        type:Object,
        required:true
    },
    billAmount:{
        type:String,
        required:true  
    },
    isDelivered:{
        type:Boolean,
        default:false
    },

    transactionId:{
        type:String,
        required:true  
    },
    paymentDetails:{
        type:String,
        required:true  
    }

},{timestamps:true});

const Order = mongoose.model("Orders",orderSchema);
module.exports = Order;