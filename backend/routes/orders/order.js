const express = require('express');
const router = express.Router()
const {Order} = require('../../models/orders/order');


router.get('/',async (req,res)=>{
    const orders = await Order.find()
    if (!orders) {
        res.status(500).json({success:false})
        
    }
    res.send(orders)
})

router.post('/',(req,res)=>{
    const order = new Order({
        image: req.body.image,
        name: req.body.name,
       
    })
    order.save()
    .then((createdOrder)=>{
        res.status(201).json(createdOrder)
    })
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router