const User = require('../models/User');
const jwt = require("jsonwebtoken");
const b = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(422).json({ message: "Add All Data" });
        } else {
            b.hash(password, 8).then(async (hashedpass) => {

                const newUser = new User({
                    name,
                    email,
                    password: hashedpass
                });
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            })
        }
    }
    catch (err) {
        res.status(422).json(err);
    }
}


const login = async (req, res) => {
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json("Wrong Credentials");
        }


        b.compare(user.password,password).then((s)=>{
            if(!s){
                return res.status(401).json("Wrong Credentials");
            }else{
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET,
                        {expiresIn:"3d"}
                    );
              
                    const { password, ...others } = user._doc;  
                    res.status(200).json({...others, accessToken});
            }
        })
    }catch(err){
        res.status(500).json(err);
    }

}


module.exports = { register,login};