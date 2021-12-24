const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const reqLogin = require('../middleware/reqLogin');
const Order = require('../models/Order');


router.post('/addOrder', reqLogin, async (req, res) => {
    const { token, total, currentUser, cartItems } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.d
        });

        const payment = await stripe.changes.stripe({
            amount: subTotal * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencykey: uuidv4()
        });

        if (payment) {
            const newOrder = new Order({
                OrderedBy: req.user._id,
                foodOrdered: cartItems.map(i => i._id),
                billAmount: total,
                shippingDetails: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id
            });
        } else {

        }
    } catch (e) {

    }
});


router.get('/ordersOfuser', reqLogin, async (req, res) => {
    try {
        const userOrders = await Order.find({ OrderedBy: req.user._id })
        .populate("foodOrdered","foodname foodDescription category")
        .sort({_id:'-1'})
        if (userOrders) {
            res.status(201).json(userOrders);
        }
    } catch (e) {

    }
});


router.put('/deliverOrder/:id',reqLogin,async(req,res)=>{
    try{
        await Order.findByIdAndUpdate(req.params.id,{
            isDelivered:true
        },{new:true}).then((s)=>{
            res.status(201).json(s)
        })
    }catch(e){
        
    }
})


module.exports = router;