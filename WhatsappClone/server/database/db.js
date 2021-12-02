import mongoose from 'mongoose';

const Connection = async () => {
    const URL = "mongodb+srv://harshit:harshit123@cluster0.7adn6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;