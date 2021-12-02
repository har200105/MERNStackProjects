const jwt = require('jsonwebtoken');  
const User = require('../models/User');



module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "You are not Logged In !!" });
    }

    jwt.verify(authorization,process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        const { _id } = payload;
        User.findById({ _id }).then(userData => {
            req.user = userData;
            next();
        })
    })
}