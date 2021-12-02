const mongoose = require('mongoose');
const db = async() => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected");
    } catch (e) {
        console.log(e);
    }
}


module.exports = db; 