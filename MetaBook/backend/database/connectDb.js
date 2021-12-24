const mongoose = require('mongoose');
const URL = "mongodb+srv://harshit:harshit@cluster0.azk3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const Connection = async() => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database Connected");
    } catch (e) {
        console.log(e);
    }

}



module.exports = Connection; 