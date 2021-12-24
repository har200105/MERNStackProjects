const Order = require('../models/Order');


const addOrder = async(req,res)=>{
    const newOrder = Order({
        orderedBy:req.user._id,
        products,
        billamount,
        shippingcharges,
        address
    });

    try {
        await newOrder.save().then((s)=>{
            res.status(201).json(s)
        })
    } catch (err) {
      res.status(422).json(err);
    }
}

const updateOrder = async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(201).json(updatedOrder);
      } catch (err) {
        res.status(422).json(err);
      }
}

const deleteOrder = async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(201).json("Order has been deleted..... Shiddat !!!!");
      } catch (err) {
        res.status(422).json(err);
      } 
}

const getOrder = async(req,res)=>{
    try {
        const orders = await Order.find({ orderedBy: req.user._id });
        res.status(201).json(orders);
      } catch (err) {
        res.status(422).json(err);
      }
}

const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({});
        res.status(201).json(orders);
      } catch (err) {
        res.status(422).json(err);
      }
}

const getMonthlyIncome = async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(201).json(income);
    } catch (err) {
      res.status(422).json(err);
    }
}





module.exports =  {addOrder,updateOrder,deleteOrder,getOrder,getAllOrders,getMonthlyIncome};