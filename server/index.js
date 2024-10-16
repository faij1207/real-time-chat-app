const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoutes');
const messageRoute = require('./Routes/messageRoute');

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/chats',chatRoute); 
app.use('/api/messages',messageRoute);

const port = process.env.PORT ||  5000;
const uri = process.env.MONGODB_URI;


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
  }); 


mongoose.connect(uri).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
});
 
