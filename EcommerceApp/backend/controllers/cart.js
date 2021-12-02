const Cart = require('../models/Cart');


const addToCart = async(req,res)=>{
try{
    const {products} = req.body;
    if(products){
        const newcart =  new Cart({
            products,
            addedBy:req.user._id
        });
        await newcart.save().then((s)=>{
            res.status(201).json(s)
        })
    }
}catch(e){
    res.status(422).json(e);
}
}

const updateCart = async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(201).json(updatedCart);
    }catch(e){
        res.status(422).json(e);
    }
}

const deleteCart = async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndDelete(req.params.id);
          res.status(201).json("Cart Deleted Shiddat !!!!.......");
    }catch(e){
        res.status(422).json(e);
    }
}


const getAllCart = async(req,res)=>{
    try {
        const usercarts = await Cart.find({});
        res.status(201).json(usercarts);
      } catch (err) {
        res.status(422).json(err);
      }
}

const getUserCart =  async (req, res) => {
    try {
      const carts = await Cart.find({addedBy:req.user._id});
      res.status(201).json(carts);
    } catch (err) {
      res.status(422).json(err);
    }
}

module.exports = {addToCart,updateCart,deleteCart,getAllCart,getUserCart};