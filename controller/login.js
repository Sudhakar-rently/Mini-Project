const db=require('../models/index');

const jwt = require("jsonwebtoken");
const authenticatetoken=require('../authentication');
const accesstoken=process.env.ACCESS_TOKEN_SECRET;

const login=async(req,res) => 
{
    const username=req.body.username;
    const password=req.body.password;
    const data=await db.users.findOne({where:{
        username : username
    }})
    console.log("data->",data);
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
}

module.exports={
    login
}