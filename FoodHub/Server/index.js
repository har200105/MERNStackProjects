const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const Connection = require('./database/Connection');
// const Connection = require('./')

// mongodb+srv://harshit:<password>@cluster0.tsv9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use(bodyParser({extended:true}));

app.use('/',require('./routes/Food'));

Connection();

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("Listening to the server")
})