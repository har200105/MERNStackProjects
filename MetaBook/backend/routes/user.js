const User = require('../models/user');
const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/reqLogin');
const b = require('bcryptjs');
const Post = require('../models/post');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
  
  

router.put("/editProfile", reqLogin, async (req, res) => {
    try {
        let profilePicture = req.body.profilePicture;
        let coverPicture = req.body.coverPicture;
        
        // if(profilePicture){
        //     cloudinary.v2.uploader.upload(profilePicture, {
        //         folder: "Shiddat",
        //         width: 150,
        //         crop: "scale"
        //       }).then(async(ds)=>{
        //           req.body.profilePicture =  ds.secure_url;
        //       })

        //       const user = await User.findByIdAndUpdate(req.user._id, {
        //         $set: req.body
        //     });
        //     if (user) {
        //         res.status(201).json({ message: "Account Has Been Updated" })
        //     }
        // }

        // if(coverPicture){

        //     cloudinary.v2.uploader.upload(coverPicture, {
        //         folder: "Shiddat",
        //         width: 150,
        //         crop: "scale"
        //       }).then(async(ds)=>{
        //           req.body.coverPicture =  ds.secure_url;
        //       })

        //       const user = await User.findByIdAndUpdate(req.user._id, {
        //         $set: req.body
        //     });
        //     if (user) {
        //         res.status(201).json({ message: "Account Has Been Updated" })
        //     }
        // }


            const user = await User.findByIdAndUpdate(req.user._id, {
                $set: req.body
            });
            if (user) {
                res.status(201).json({ message: "Account Has Been Updated" })
            }    
    } catch (e) {
        return res.status(422).json(e);
    }
});


router.delete("/deleteuser/:id", reqLogin, async (req, res) => {
    try {
        if (req.user.isAdmin === true || req.user._id === req.params.id) {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(201).json({ message: "Account Deleted" });
        } else {
            res.status(401).json({ message: "You Can Delete Your Account Only !!" })
        }
    } catch (e) {
        res.status(422).json(e);
    }
});

router.get("/getUser/:id", reqLogin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(201).json(user);
    } catch (e) {
        res.status(422).json(e);
    }
});

router.put('/followUser/:id', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $push: {
            followers: req.user._id
        }
    }).then(async () => {
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                following: req.params.id
            }
        })
    }).then(() => {
        res.status(201).json()
    })
});

router.put('/unfollowUser/:id', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $pull: {
            followers: req.user._id
        }
    }).then(async () => {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                following: req.params.id
            }
        })
    }).then(() => {
        res.status(201).json()
    })
})

router.get('/getUserData/:id', reqLogin, async (req, res) => {
    try {
        await User.findById(req.params.id).then((s) => {
            res.status(201).json(s);
        });
    } catch (e) {

    }
});

router.get('/getUserPosts/:id', reqLogin, async (req, res) => {
    try {
        console.log(req.params)
        await Post.find({ postedBy: req.params.id })
            .populate("postedBy", "name email profilePicture coverPicture")
            .populate("comments.commentedBy", "name email profilePicture _id")
            .sort("-createdAt").then((a) => {
                res.status(201).json(a)
            })

    } catch (e) {
        console.log(e)
    }
});

router.get('/getUserInfo/:id', reqLogin, async (req, res) => {
    try {
        await User.findById(req.params.id)
            .populate("following", "name email profilePicture")
            .populate("followers", "name email profilePicture")
            .then((usr) => {
                res.status(201).json(usr)
            })
    } catch (e) {

    }
});


router.post('/searchuser', async (req, res) => {
    let userPattern = new RegExp("^" + req.body.query)
    await User.find({ name: { $regex: userPattern } })
        .select("_id email name profilePicture")
        .then((user) => {
            res.status(201).json(user)
        }).catch((e) => {
            console.log(e)
        })
});

router.get('/getOnlineUsers', reqLogin, async (req, res) => {
    await User.find({ isOnline: true })
        .then((s) => {
            // console.log(s)
            res.status(201).json(s)
        })
});

router.put('/makeUserOnline', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        isOnline: true
    }).then(() => {
        res.status(201).json({ message: "Online" })
    })
});

router.put('/makeUserOffline', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        isOnline: false
    }).then(() => {
        res.status(201).json({ message: "Online" })
    })
});







module.exports = router;