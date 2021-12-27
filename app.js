const express=require("express");
const app=express();
const PORT =process.env.PORT;
require('dotenv').config()

const accesstoken=process.env.ACCESS_TOKEN_SECRET;
const db=require('./models/index');
var bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(express.json());
const jwt = require("jsonwebtoken");
const authenticatetoken=require('./authentication');

app.get("/getuserdata",async(req,res)=>{
    let value=req.query.id;
    const row= await db.users.readdata(value);
    res.json(row);
})

app.post("/createuser",async(req,res)=>{
    console.log(req.body);
    const row= await db.users.Insertdata(req.body);
    console.log(row);
    res.json(row);
})

app.delete("/deleteuser",async(req,res)=>{
    let value=req.query.id;
    const row= await db.users.Deletedata(value);
    res.json(row);
})

app.post("/login",async(req,res) => 
{
    const username=req.body.username;
    const password=req.body.password;
    const data=await db.users.findOne({
        username : username
    })
    console.log("data",data);
    const flg= (data) && (data.password===password);
    console.log(flg);
    if(!flg)
    {
        res.json("User not valid!");
    }
    else{
    const user={ username, password, id: data.id };
    const accessToken = jwt.sign(user, accesstoken);
    res.json({ accessToken });
    }
})

app.post("/createorder",authenticatetoken,async(req,res)=>{
    console.log(req.body);
    const record={
            product:req.body.product,
            price:req.body.price,
            quantity:req.body.quantity,
            user_id:req.user_id
    }
    const row= await db.orders.Insertdata(record);
    console.log(row);
    res.json(row);
})

app.get("/getorderdata",authenticatetoken,async(req,res)=>{
    let value=req.query.id;
    const row= await db.orders.readdata(value);
    res.json(row);
})

app.delete("/deleteorder",authenticatetoken,async(req,res)=>{
    let value=req.query.id;
    const row= await db.orders.Deletedata(value);
    res.json(row);
})

app.get("/getorders",authenticatetoken,async(req,res)=>{
    let value=req.user_id;
    const row= await db.orders.ordersdata(value);
    res.json(row);
});

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
});