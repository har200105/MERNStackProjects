const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.use('/',require('./routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("Shiddat Banalu Meri Chahat Banalu........!!");
});

