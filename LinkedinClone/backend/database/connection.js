const mongoose = require('mongoose');
const URL = process.env.DATABASE;

const Connection = async() => {
  
    try {
        
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("Database");
    } catch (e) {
        console.log(e);
    }

}


module.exports = Connection;