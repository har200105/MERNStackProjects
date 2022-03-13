const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cors = require('cors');
app.use(cors());
const PORT = 5000;
const connectDB = require('./database/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();



const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");


app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.listen(PORT, () => {
    console.log("Server is Listening");
});