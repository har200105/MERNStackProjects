const mongoose = require('mongoose');
const connectDB = async() => {
   await mongoose.connect(process.env.DATABASE)
        .then((connection) => console.log("Database Connected"))
        .catch((err) => console.log(err));
}

module.exports = connectDB;