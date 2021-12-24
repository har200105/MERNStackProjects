const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');

router.get('/getUser/:id', async (req, res) => {
    try {
        let ud = await User.findById(req.params.id)
        .populate("foodOrders","foodOrdered Fromrestaurant billAmount isDelivered paymentDetails")

        ud = Order.populate(ud,{
            path:"foodOrders",
            select:"foodname foodprice category"
        });

        res.status(201).json(ud)
    } catch (e) {

    }
});


module.exports = router;
