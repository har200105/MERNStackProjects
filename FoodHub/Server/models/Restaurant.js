const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const restaurantSchema = mongoose.Schema({
    
    restaurantName:{
        type:String,
        required:true
    },

    restaurantAddress:{
        type:String,
        required:true
    },
    restaurantEmail:{
        type:String,
        required:true
    },
    restaurantFoods:{
        type:Schema.Types.ObjectId,
        ref:"Foods"
    },
    restaurantContactNumber:{
        type:String,
        required:true
    },
    restaurantAdmin:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    restaurantGeolocation:{

    }
},{timestamps:true});

const Restaurant = mongoose.model('Restaurants',restaurantSchema);

module.exports = Restaurant;