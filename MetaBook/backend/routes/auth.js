const express = require('express');
const router = express.Router();
require("dotenv").config();
const User = require('../models/user');
const b = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpgen = require('otp-generator');
const crypto = require('crypto');
const { DH_CHECK_P_NOT_PRIME } = require('constants');
const key = "Shiddat";


router.post("/signup", async(req, res) => {
    console.log(req.body);
    const { email, password,name,profilePicture,coverPicture,bio} = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Add all the data" });
    }
    await User.findOne({ email: email }).then((SavedUser) => {
        if (SavedUser) {
            return res.status(422).json({ error: "User Already Exists" });
        }
        b.hash(password, 8)
            .then(async(hashedpassword) => {
                const user = new User({
                    email,
                    password: hashedpassword,
                    name,
                    profilePicture,
                    coverPicture,
                    bio,
                })

                await user.save()
                    .then((data) => {
                        res.status(201).json({ message: "User Saved Successfully"})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    })
})

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Please add Email and Password Both" })
    }
    await User.findOne({ email: email })
        .then(SavedUser => {
            if (!SavedUser) {
                return res.status(422).json({ error: "Invalid Data" })
            }
            b.compare(password, SavedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: SavedUser._id }, process.env.JWT_KEY)
                        const { _id, name, email, followers, following, profilePicture } = SavedUser;
                        return res.json({ token, user: { _id, name, email, followers, following, profilePicture } });
                    } else {
                        return res.status(422).json({ error: 'Invalid Email or Password' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});


router.get('/generateOtp',async(req,res)=>{
    
    const otp = otpgen.generate(4,{
        lowerCaseAlphabets:false,
        specialChars:false,
        upperCaseAlphabets:false
    });

    const ttl = 5*60*1000;
    const expires = Date.now() + ttl;
    const data = `${req.body.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256',key).update(data).digest("hex");
    const fullhash  = `${hash}.${expires}`;
    console.log(otp);

    return checkOtp(null,fullhash);

});

const checkOtp = async(params,callback)=>{
    let [hashvalue,expires] = params.hash.split('.');
    

}






module.exports = router;