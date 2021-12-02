const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then((s)=>{
      console.log("Database Shiddat")
    });
  } catch (error) {
  }
};

module.exports = connectDB;
