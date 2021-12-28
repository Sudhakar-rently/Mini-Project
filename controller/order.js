const db=require('../models/index');

const createorder=async(req,res)=>{
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
}

const getorders=async(req,res)=>{
    let value=req.user_id;
    const row= await db.orders.ordersdata(value);
    res.json(row);
}

const cancelorder=async(req,res)=>{
    let value=req.query.id;
    const row= await db.orders.Deletedata(value);
    res.json(row);
}

module.exports={
    createorder,
    getorders,
    cancelorder
}