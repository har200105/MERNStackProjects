const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require('./database/connectDB');

require("dotenv").config();
const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



app.use("/api/user", require("./routes/auth"));
app.use("/api", require("./routes/video"));
app.use("/api", require("./routes/user"));


db(); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Shiddat running on port:${PORT}`);
});
