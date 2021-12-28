const db=require('../models/index');

const getuser=async(req,res)=>{
    let value=req.query.id;
    const row= await db.users.readdata(value);
    res.json(row);
}

const createuser=async(req,res)=>{
    console.log(req.body);
    const row= await db.users.Insertdata(req.body);
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
    let password=req.body.password;
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