const db=require('../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getuser=async(req,res)=>{
    let value=req.query.id;
    const row= await db.users.readdata(value);
    res.json(row);
}

const createuser=async(req,res)=>{
    console.log(req.body);    

    const password=req.body.password;
    const new_password=await bcrypt.hash(password, saltRounds).then(function(hash) {
        return hash;
    });
    const record={
        username:req.body.username,
        password:new_password,
        email:req.body.email,
        ph_number:req.body.ph_number
    }
    console.log(record.password);
    const row= await db.users.Insertdata(record);
    console.log(row);
    res.json(row);
}

const deleteuser=async(req,res)=>{
    let value=req.query.id;
    const row= await db.users.Deletedata(value);
    res.json(row);
}

const updatepassword=async(req,res)=>{
    let value=req.body.username;
    let password=await bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        return hash;
    });
    const row=await db.users.update({ password: password }, {
        where: {
          username:value
        }
      });
    res.json("Success");
}

module.exports={
    getuser,
    createuser,
    deleteuser,
    updatepassword
}