const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "You are not Logged In !!" });
    }

    jwt.verify(authorization, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        const { _id } = payload;
        User.findById(_id).then(userData => {
            req.user = userData;
            next();
        })
    })
}