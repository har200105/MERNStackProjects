const router = require('express').Router();
const User = require('../models/user');
const Notification = require('../models/notification');
const reqLogin = require('../middleware/reqLogin');
const cloudinary = require('cloudinary');

router.put('/sendConnectionReq/:id', reqLogin, async (req, res) => {

    console.log(req.params)

    try {

        const { id } = req.params;
        const newNot = new Notification({
            notificationType: "connection",
            notificationForUser: id,
            notificationBy: req.user._id,
            notificationDescription: "Have Sent You a Connection Request",
            seen: false
        });

        await newNot.save().then((s) => {
            User.findByIdAndUpdate(id, {
                $push: {
                    notifications: s._id
                }
            }, { new: true }).then((d) => {
                res.status(201).json(d)
                console.log(d);
            })
        })
    } catch (e) {
        console.log(e)
    }

});


router.get('/getNotifications', reqLogin, async (req, res) => {
    try {
        await Notification.find({ notificationForUser: req.user._id })
            .populate("notificationBy", "name email pic")
            .sort("-createdAt")
            .then((s) => {
                console.log(s)
                res.status(201).json(s)
            })
    } catch (e) {

    }
});


router.post('/acceptRequest', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            connections: req.body.userid
        }
    }).then(async() => {
        await User.findByIdAndUpdate(req.body.userid, {
            $push: {
                connections: req.user._id
            }
        }).then(async() => {
            await Notification.findByIdAndDelete(req.body.notificationid).then((done) => {
                res.status(201).json({ message: "Done" })
            });
        });
    });
});

router.post('/rejectRequest/:id', reqLogin, async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id).then((done) => {
        res.status(201).json({ message: "Done" })
    });
});


router.put('/editProfile',reqLogin,async(req,res)=>{
    try{
    await User.findByIdAndUpdate(req.user._id,{
        $set:req.body
    },{new:true}).then((d)=>{
        res.status(201).json(d)
    })
}catch(e){
    res.status(401).json(e)
}
});




module.exports = router;