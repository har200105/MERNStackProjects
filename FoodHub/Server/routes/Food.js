const Food = require('../models/food');
const router = require('express').Router();

router.post('/addFood',async(req,res)=>{
    const newFood = new Food(req.body);
    await newFood.save().then((s)=>{
        res.status(201).json(s)
    })
});

router.get('/getFood',async(req,res)=>{
    const allFood = await Food.find({})
    if(allFood){
        res.status(201).json(allFood)
    }
});

module.exports = router;