const db=require('../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const authenticatetoken=require('../authentication');
const accesstoken=process.env.ACCESS_TOKEN_SECRET;

const login=async(req,res) => 
{
    const username=req.body.username;
    
    const data=await db.users.findOne({where:{
        username : username
    }})
    console.log("data->",data);
    
    const result=await bcrypt.compare(req.body.password, data.password);
    
    const flg= (data) && (result==true);
    console.log(flg);
    if(!flg)
    {
        res.json("User not valid!");
    }
    else{
    const user={ username, password: req.body.password, id: data.id };
    const accessToken = jwt.sign(user, accesstoken);
    res.json({ accessToken });
    }
}

module.exports={
    login
}