const express = require('express');
const cors = require('cors');
const bodyParser =  require('body-parser')
const app = express();
require('dotenv').config();
const db = require('./database/db');
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }));
  app.use(express.json({ extended: false, limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))  
app.use(express.json());
app.use('/',require('./routes/auth'));
app.use('/',require('./routes/category'));
app.use('/',require('./routes/post'));
app.use('/',require('./routes/user'));
db();
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Blog App");
})

