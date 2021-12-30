const express=require('express');
const router=express.Router();
const app=express();

var bodyParser=require("body-parser")
app.use(bodyParser.json());

const { celebrate, Joi, errors, Segments } = require('celebrate');

const authenticatetoken=require('../authentication');
const ordercontroller=require('../controller/order.js');

const usercontroller=require('../controller/user.js');

router.get("/",celebrate({
    query: Joi.object().keys({
      id: Joi.number().required()
    })
}),usercontroller.getuser);

router.post("/",celebrate({ 
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      ph_number: Joi.number().required()
    })
}),usercontroller.createuser);
 
router.delete("/",celebrate({
    query: Joi.object().keys({
      id: Joi.number().required()
    })
}),usercontroller.deleteuser);

router.put("/",celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
}),authenticatetoken,usercontroller.updatepassword);

module.exports=router;