const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
app.use(helmet());
app.use(morgan('common'));

app.use("/api",require('./routes/auth'));
app.use("/api",require('./routes/post'));
app.use("/api",require('./routes/user'));


const PORT = 5000 || process.env.PORT;


app.listen(PORT,()=>{
    console.log("Listening To The Server")
});