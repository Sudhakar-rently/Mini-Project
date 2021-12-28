const express=require('express');
const router=express.Router();
const db=require('../models/index');

const { celebrate, Joi, errors, Segments } = require('celebrate');

const logincontroller=require('../controller/login');

router.post("/",celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
}),logincontroller.login);

module.exports=router;