const Category = require('../models/Category');

const addCategory = async(req,res)=>{
    try{
    const newcat = await Category(req.body);
    await newcat.save().then((s)=>{
        res.status(201).json(s)
    });
}catch(e){
    res.status(401).json(e);
}    
}

const getCategory = async(req,res)=>{
    await Category.find({}).then((s)=>{
        res.status(201).json(s);
    })
} 

module.exports = {addCategory,getCategory};