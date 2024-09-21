const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');

const app = express();
require("dotenv").config();

const port = process.env.PORT ||  5000;
const uri = process.env.MONGODB_URI;


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
  }); 


mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
});
 
