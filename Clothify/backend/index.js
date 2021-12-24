const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
app.use(express.json());

const db  = require('./database/db');
app.use('/',require('./routes/auth'));
app.use('/',require('./routes/order'));
app.use('/',require('./routes/product'));
app.use('/',require('./routes/cart'));

db();

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("Shiddat Banalu Meri Chahat Banalu........!!");
});

