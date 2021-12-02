const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const reqLogin = require('../middleware/reqLogin');
const User = require('../models/user');
const Notification = require('../models/notification');




router.post('/createpost', reqLogin, async (req, res) => {
    const { caption, pic } = req.body;
    if (!caption) {
        return res.status(422).json({ error: "Kuch toh daldo" });
    }
    const post = new Post({
        caption,
        pic,
        postedBy: req.user._id
    });

    await post.save().then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/getPosts', reqLogin, async (req, res) => {
    const posts = await Post.find({})
        .populate("postedBy", "email name pic")
        .populate("comments.commentedBy", "email name pic")
        .sort("-createdAt");
    res.status(201).json(posts);
});


router.put('/putLike/:id', reqLogin, async (req, res) => {
    console.log(req.body);
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $push: {
                likes: req.user._id
            }
        }, { new: true }).then((li) => {
            res.status(201).json(li);
        })
    } catch (e) {
        res.status(422).json(e)
    }
});


router.put('/takeLike/:id', reqLogin, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: {
                likes: req.user._id
            }
        }, { new: true }).then((li) => {
            res.status(201).json(li);
        })
    } catch (e) {
        res.status(422).json(e)
    }
});

router.post('/comment/:id', reqLogin, async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        $push: {
            comments: {
                commentedText: req.body.commentedText,
                commentedBy: req.user._id
            }
        }
    }, { new: true }).then((ps) => {
        res.status(201).json(ps)
    })
});

router.get('/getUserData/:id', reqLogin, async (req, res) => {
    try {
        await User.findById(req.params.id).then(async(d) => {
            if((req.user._id).toString() ===  (d._id).toString()){
                console.log(req.user._id)
                console.log(d._id)
                return  res.status(201).json(d)
            }
                console.log("false");
           const newnotf = new Notification({
            notificationType: "viewed",
            notificationForUser: req.params.id,
            notificationBy: req.user._id,
            notificationDescription: "Seen Your Profile",
            seen: false
           })
        
           await newnotf.save().then(()=>{
            res.status(201).json(d)
           })
    

        })
    } catch (e) {
        res.status(401).json(e)
    }
});

router.get('/getUserPosts/:id', reqLogin, async (req, res) => {
    try {
        await Post.find({ postedBy: req.params.id })
        .populate("postedBy", "email name pic")
        .populate("comments.commentedBy", "email name pic")
        .sort("-createdAt")
        .then((post) => {
            res.status(201).json(post)
        });
    } catch (e) {
        res.status(401).json(e)
    }
})


module.exports = router;