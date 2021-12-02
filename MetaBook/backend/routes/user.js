const User = require('../models/user');
const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/reqLogin');
const b = require('bcryptjs');

router.put("/updateuser/:id",reqLogin,async(req,res)=>{
    try{
        if(req.user._id === req.params.id){
            if(req.body.newpassword){
                const user = await User.findById(req.params.id);
                if(b.compare(req.body.oldpassword,user.password)){
                    const hashedPassword = await b.hash(req.body.newpassword, 8);
                    req.body.password = hashedPassword;
                }
            }
            try{
                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                });
                if(user){
                    res.status(201).json({message:"Account Has Been Updated"})
                }
            }catch(e){
                return res.status(422).json(e);
            }
        }
    }catch(e){
        res.status(422).json(e);
    }
});


router.delete("/deleteuser/:id",reqLogin,async(req,res)=>{
    try{
        if(req.user.isAdmin===true || req.user._id === req.params.id){
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(201).json({message:"Account Deleted"});
        }else{
            res.status(401).json({message:"You Can Delete Your Account Only !!"})
        }
    }catch(e){
        res.status(422).json(e);
    }
});

router.get("/getUser/:id",reqLogin,async(req,res)=>{
    try{
        const user =  await User.findById(req.params.id);
        const {password,...other}= user._doc;
        res.status(201).json(user);
    }catch(e){
        res.status(422).json(e);
    }
});


router.put("/sendFriendRequest/:id",reqLogin,async(req,res)=>{
    if(req.user._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user._id);
            if(!user.followers.includes(req.user._id)){
              await user.updateOne({$push:{pendingFriendRequests:req.user._id}});
               await currentUser.updateOne({$push:{sendFriendRequests:req.params.id}})
            }else{
                res.status(403).json({message:"You Already Follow This User"})
            }
        }catch(e){
            res.status(422).json(e);
        }
    }
});


router.put("/unfriend/:id",reqLogin,async(req,res)=>{
    if(req.user._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user._id);
            if(!user.followers.includes(req.user._id)){
              await  user.updateOne({$pull:{followers:req.user._id}});
               await currentUser.updateOne({$pull:{followings:req.params.id}})
            }else{
                res.status(403).json({message:"You Don't Follow This User"})
            }
        }catch(e){
            res.status(422).json(e);
        }
    }
});

router.put("/acceptFriendRequest/:id",reqLogin,async(req,res)=>{
    if(req.user._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user._id);
            if(!user.followers.includes(req.user._id)){
              await  user.updateOne({$pull:{followers:req.user._id}});
               await currentUser.updateOne({$pull:{followings:req.params.id}})
            }else{
                res.status(403).json({message:"You Don't Follow This User"})
            }
        }catch(e){
            res.status(422).json(e);
        }
    }
});






module.exports = router;