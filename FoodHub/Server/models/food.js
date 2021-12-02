const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const foodSchema = mongoose.Schema({
    
    foodname:{
        type:String,
        required:true
    },
    foodprice:{
        type:Array,
        required:true
    },
    varients:{
        type:Array,
        required:true
    },
    foodDescription:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },

    foodImage:{
        type:String,
        required:true
    },

    restaurantDetails:{
        type:Schema.Types.ObjectId,
        ref:"Restaurant"
    }
},{timestamps:true});

const Food = mongoose.model('Foods',foodSchema);

module.exports = Food;