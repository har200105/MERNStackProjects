const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');

router.post("/signup", async(req, res) => {
    const { email, password, name, pic } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Add all the data" });
    }
    try {
        const exist = await User.findOne({
            email: req.body.email
        })
        if (exist) {
            return res.status(401).json("Email Already Exist");
        } else {
            const newUser = User({
                email,
                password,
                name,
                pic
            });
            await newUser.save().then((s)=>{
                const token = jwt.sign({_id:s._id},process.env.JWT_SECRET,{expiresIn:"1d"})
                res.status(201).json({newUser,token});
            });
            
        }
    } catch (e) {
        console.log(e.message);
    }

})

router.post("/signin", async(req, res) => {
    try {
        const exist = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        .populate("notifications")
        .populate("notifications.notificationBy","name email pic")
        .exec((err,result)=>{
            if(err){

            }else{
                console.log(result)
                const token = jwt.sign({_id:result._id},process.env.JWT_SECRET,{expiresIn:"1d"});
                console.log(token)
                return res.status(201).json({exist:result,token});
            }
        })

    } catch (e) {
        console.log(e);
    }
});






module.exports = router;