const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const reqLogin = require('../middleware/reqLogin');
const User = require('../models/user');


router.post('/addPost',reqLogin,async(req,res)=>{
    try{
    const {caption,image} = req.body;
    if(!caption){
        res.status(422).json({message:"Caption is Required"});
    }else{
        const newPost = Post({
            postedBy:req.user._id,
            caption,
            image
        })

        await newPost.save().then((p)=>{
            res.status(201).json(p)
        })
    }
    }catch(e){
        res.status(422).json(e);
    }
});


router.get('/getTimeLinePosts',reqLogin,async(req,res)=>{
    try{
    // await Post.find({postedBy:{$in:[req.user.followings]}}).then((s)=>{
    //     res.status(201).json(s)
    // })

    const currentUser = await User.findById(req.user._id);
    const userPosts = await Post.find({postedBy:req.user._id});
    const friendPosts = await Promise.all(
        currentUser.followings.map((i)=>{
            return Post.find({postedBy:i})
        })
    );

    res.status(201).json(userPosts.concat(...friendPosts));
}catch(e){
    res.status(422).json(e);
}
});


router.get('/getUserPosts/:id',reqLogin,async(req,res)=>{

});


router.put("/updatePost/:id",reqLogin,async(req,res)=>{

})

router.delete('/deletePost/:id',reqLogin,async(req,res)=>{

});






module.exports = router;