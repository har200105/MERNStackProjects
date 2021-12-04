const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser=require('body-parser')
const connection = require('./database/connectDb');
dotenv.config();
// app.use(helmet());
// app.use(morgan('common'));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }));
  app.use(express.json({ extended: false, limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))  
app.use(cors());
app.use(express.json());
app.use("/api",require('./routes/auth'));
app.use("/api",require('./routes/post'));
app.use("/api",require('./routes/user'));
app.use("/api",require('./routes/conversation'));
app.use("/api",require('./routes/message'));
connection();

const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log("Listening To The Server")
});