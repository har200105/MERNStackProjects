const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.URI;


const Connection = async() => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("Database Connected");
    } catch (e) {
        console.log(e);
    }

}


module.exports = Connection;