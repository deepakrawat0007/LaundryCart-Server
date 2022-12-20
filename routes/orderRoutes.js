const router = require("express").Router();
const mongoose = require("mongoose");
const ordersModel = require("../models/orderSchema");
const ProductModel = require("../models/productSchema");


router.post("/createorder",async(req,res)=>{
    console.log(req.user);

    try{
        const data = await ordersModel.create({user:req.user, ...req.body});
        res.status(201).json(data);
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
})

router.get("/product",async(req,res)=>{
    
    try{
        
        const data = await ProductModel.find();
        res.json(data);
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })

    }
})

module.exports = router;