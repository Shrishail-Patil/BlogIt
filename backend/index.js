const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express()
const port = process.env.PORT;
app.use(cors());
app.use(express.json());



//Available Routes
app.use('/api/auth',require("./routes/auth"))
app.use('/api/home',require("./routes/home"))

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
})

