const User = require("../models/User");
const b = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  

const signup =  async (req, res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
          return res.status(401).json({ message: "Please Add All The Feilds" });
        }else{
            await b.hash(password,8).then(async(p)=>{
              if(req.body.file) {
                const imgurl =  cloudinary.v2.uploader.upload(req.body.file,{
                    folder:"Shiddat",
                    width:150,
                    crop:"scale"
                  }).then(async(i)=>{

      
                const newUser = new User({
                    name,
                    email,
                    password:p,
                    profilePicture:i.secure_url
                })
                
                await newUser.save().then((a)=>{ 
                  console.log(a)           
                  const token = jwt.sign({_id:a._id},process.env.JWT_SECRET,{expiresIn:"1d"});
                  const {_id,name,email} = a;
                  res.status(201).json({_id,name,email,token});
                })
            })
          }else{
            const newUser = new User({
              name,
              email,
              password:p,
          })
          
          await newUser.save().then((a)=>{ 
            console.log(a)           
            const token = jwt.sign({_id:a._id},process.env.JWT_SECRET,{expiresIn:"1d"});
            const {_id,name,email} = a;
            res.status(201).json({_id,name,email,token});
          })
          }
        })
        
        }
    } catch (err) {
      res.status(422).json(err);
    }
}

const login = async (req, res) => {
  try{
  const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ error: "Please add Email and Password Both" })
    }
    await User.findOne({ email: email })
        .then(SavedUser => {
            if (!SavedUser) {
                return res.status(401).json({ error: "Invalid Data" })
            }
            b.compare(password, SavedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: SavedUser._id }, process.env.JWT_SECRET)
                        const { _id, name, email,profilePicture } = SavedUser;
                        console.log(_id, name, email)
                        return res.status(201).json({ token,  _id, name, email,profilePicture });
                    } else {
                        return res.status(401).json({ error: 'Invalid Email or Password' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
      }catch(e){
        console.log(e);
      }
  }

module.exports = {signup,login};