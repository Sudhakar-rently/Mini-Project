const express=require("express");
const PORT =process.env.PORT;
require('dotenv').config()

const app=express();

app.use(express.json());
const jwt = require("jsonwebtoken");
const authenticatetoken=require('./authentication');

const user=require('./router/user.js');
const login=require('./router/login.js');
const order=require('./router/order.js');

app.use('/user',user);
app.use('/login',login);
app.use('/order',order);

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
});