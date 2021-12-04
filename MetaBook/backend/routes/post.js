const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const reqLogin = require('../middleware/reqLogin');
const User = require('../models/user');


router.post('/addPost', reqLogin, async (req, res) => {
    try {
        // console.log(req.body)
        console.log("Test")
        const { caption, image } = req.body;
        if (!caption) {
            res.status(422).json({ message: "Caption is Required" });
        } else {
            const newPost = Post({
                postedBy: req.user._id,
                caption,
                image
            })

            await newPost.save().then((p) => {
                res.status(201).json(p)
            })
        }
    } catch (e) {
        res.status(422).json(e);
    }
});


router.get('/getTimeLinePosts', reqLogin, async (req, res) => {
    try {
        // await Post.find({postedBy:{$in:[req.user.followings]}}).then((s)=>{
        //     res.status(201).json(s)
        // })

        // const currentUser = await User.findById(req.user._id);
        const userPosts = await Post.find({})
            .populate("postedBy", "name email profilePicture coverPicture")
            .populate("comments.commentedBy","name email profilePicture _id")
            .sort("-createdAt")
            ;
        // console.log(userPosts)
        // const friendPosts = await Promise.all(
        //     currentUser.following.map((i) => {
        //         return Post.find({ postedBy: i })
        //             .populate("postedBy", "name email profilePicture coverPicture")
        //             .sort("-createdAt")
        //             ;
        //     })
        // );

        res.status(201).json(userPosts);
    } catch (e) {
        res.status(422).json(e);
    }
});






router.put('/like/:id', reqLogin, async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        $push: {
            likes: req.user._id
        }
    }, { new: true }).then((da) => {
        res.status(201).json(da)
    })
});


router.put('/dislike/:id', reqLogin, async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        $pull: {
            likes: req.user._id
        }
    }, { new: true }).then((da) => {
        res.status(201).json(da)
    })
});

router.delete('/deletePost/:id', reqLogin, async (req, res) => {
    console.log(req.params)
    try {
        await Post.findByIdAndDelete(req.params.id).then((de) => {
            // console.log(de)
            res.status(201).json({message:"Post Deleted"});
        })
    } catch (e) {

    }
});

router.put('/comment/:id',reqLogin,async(req,res)=>{
    try{
        await Post.findByIdAndUpdate(req.params.id,{
            $push:{
                comments:{
                    commentedBy:req.user._id,
                    comment:req.body.commentedText
                }
            }
        }).then((s)=>{
            res.status(201).json(s);
        })
    }catch(e){
    }
});




module.exports = router;