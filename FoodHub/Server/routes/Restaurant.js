const router = require('express').Router();
const Restaurant = require('../models/Restaurant');
const reqLogin = require('../middleware/reqLogin');

router.get('/getRestaurant',async(req,res)=>{
    await Restaurant.find({}).then((s)=>{
        res.status(201).json(s)
    })
});

router.get('/getRestaurantById/:id',async(req,res)=>{
    await Restaurant.findById(req.params.id).then((s)=>{
        res.status(201).json(s)
    })
});

router.post('/requestForRestaurant',reqLogin,async(req,res)=>{
    const {restaurantName,restaurantAddress,restaurantEmail,restaurantContactNumber} = req.body;
    
    if(!restaurantName || !restaurantAddress || !restaurantEmail || !restaurantContactNumber){
        res.status(422).json({message:"Error"});
    }

    else{
     
        const newRestaurant = new Restaurant({
            restaurantName,
            restaurantAddress,
            restaurantEmail,
            restaurantContactNumber
        });

        await newRestaurant.save().then((da)=>{
            res.status(201).json(da);
        }) 
    }

});

router.put('/acceptRestaurant/:id',reqLogin,async(req,res)=>{
    await Restaurant.findByIdAndUpdate(req.params.id,{
        isAccepted:true
    }).then((s)=>{
        res.status(201).json(s)
    })
});

module.exports = router;