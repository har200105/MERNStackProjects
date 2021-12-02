const express = require('express');
const app = express();
require('dotenv').config();
const Connection = require('./database/connection');
const cors = require('cors');



app.use(cors());
app.use(express.json())



app.use('/', require('./routes/auth'));
app.use('/', require('./routes/post'));
app.use('/',require('./routes/user'));
Connection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Listening to the Server");
})