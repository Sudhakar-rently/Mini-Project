const express=require('express');
const router=express.Router();
const db=require('../models/index');

const app=express();
var bodyParser=require("body-parser")
app.use(bodyParser.json());

const { celebrate, Joi, errors, Segments } = require('celebrate');

router.use(express.json());
const jwt = require("jsonwebtoken");

const authenticatetoken=require('../authentication');
const ordercontroller=require('../controller/order.js');

router.post("/",celebrate({
    body: Joi.object().keys({
      product: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required()
    })
}),authenticatetoken,ordercontroller.createorder);

router.get("/",authenticatetoken,ordercontroller.getorders);

router.delete("/",celebrate({
    query: Joi.object().keys({
      id: Joi.number().required()
    })
}),authenticatetoken,ordercontroller.cancelorder);
 
module.exports=router;