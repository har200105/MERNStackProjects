const User = require('../models/User');

const getUser = async(req,res)=>{
    const query = req.query;
    if(query.id){
        await User.findOne({_id:query.id}).then((data)=>{
            return res.status(201).json(data)
        })
    }else if(query.email){
        await User.find({email:query.email}).then((data)=>{
            return res.status(201).json(data)
        })
    }
}



module.exports = {getUser};