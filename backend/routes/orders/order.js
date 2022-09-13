const express = require('express');
const router = express.Router()
const {Order} = require('../../models/orders/order');
const {OrderItem} = require('../../models/orderItems/orderItem');


router.get('/:id',async (req,res)=>{
    const orders = await Order.findById(req.params.id).populate('user','name')
    if (!orders) {
        res.status(500).json({success:false})
        
    }
    res.send(orders)
})

router.get('/',async (req,res)=>{
    const orders = await Order.find().populate('user','name').sort({'dateOrdered':-1})
    if (!orders) {
        res.status(500).json({success:false})
        
    }
    res.send(orders)
})

router.post('/',async (req,res)=>{
    const orderItemsIds =  Promise.all(req.body.orderItems.map(async orderItem=>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product,
        })
        
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemsIdsResolved  = await orderItemsIds;

    let order = new Order({
        orderItems:orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        phone:req.body.phone,
        country:req.body.country,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user
    })
    order = await order.save()
    if(!order) return res.status(400).send("Order could not be created")
    res.status(201).send(order)
})

module.exports=router