const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {

      const { authorization } = req.headers;
      console.log(authorization);
      if (!authorization) {
          res.status(401).json({ error: "You are not Logged In !!" });
      }
      
    jwt.verify(authorization, process.env.JWT_KEY, (err, payload) => {
      if (err) {
          return res.status(401).json({ error: "You must be logged in" });
      }
      console.log(payload);
      const { id } = payload;
      User.findById(id).then(userData => {
          req.user = userData;
          next();
      })
  })
    } catch (error) {
      res.status(401);
      throw new Error("Failed");
    }
  }

 


module.exports = { protect };
