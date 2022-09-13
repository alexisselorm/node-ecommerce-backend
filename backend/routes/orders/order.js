const express = require('express');
const router = express.Router()
const {Order} = require('../../models/orders/order');
const {OrderItem} = require('../../models/orderItems/orderItem');


router.get('/:id',async (req,res)=>{
    const orders = await Order.findById(req.params.id)
    .populate('user','name')
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}})
    !orders ? res.status(500).json({success:false}) : res.send(orders);
})

router.get('/',async (req,res)=>{
    const orders = await Order.find().populate('user','name').sort({'dateOrdered':-1})
    if (!orders) {
       return res.status(500).json({success:false})
        
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
    const totalPrices =await Promise.all(orderItemsIdsResolved.map(async(orderItemId)=>{
    const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
    const totalPrice = orderItem.product.price * orderItem.quantity
    console.log(totalPrice);
    return totalPrice
}))
const totalPrice = totalPrices.reduce((accumulator,current)=>accumulator+current,0)

// console.log(totalPrices);
    let order = new Order({
        orderItems:orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        phone:req.body.phone,
        country:req.body.country,
        status:req.body.status,
        totalPrice:totalPrice,
        user:req.body.user
    })
    order = await order.save()
    if(!order) return res.status(400).send("Order could not be created")
    res.status(201).send(order)
})

router.put('/:id',async(req,res)=>{
    let order = await Order.findByIdAndUpdate(req.params.id,{
        status: req.body.status
    },{
        new:true
    })
    if(!order) return res.status(401).send("Error with updating the order")
    res.status(201).send(order)
})

router.get('/get/totalsales', async(req,res)=>{
    const totalSales = await Order.aggregate([
        {$group:{_id:null,totalsales:{$sum: '$totalPrice'}}}
    ])
    return !totalSales ? res.status(400).send('The total sales cannot be generated') : res.send({totalsales:totalSales.pop().totalsales});
})

router.get('/get/count',async (req,res)=>{
    const orderCount = await Order.countDocuments()
    return !orderCount ? res.status(400).send("We couldn't count jack") : res.send({orders:orderCount});

})
// My code that works <-- Mostly -->
// router.delete('/:id', async (req,res)=>{
//     let order =await Order.findByIdAndRemove(req.params.id, async (orderItem)=>{
//         await OrderItem.findByIdAndRemove(orderItem)
//     })

//     return order ? res.status(200).send("Order deleted") : res.status(400).json("Something went wrong");
// })

// More sophisticated one but not with async
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await Order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get('/get/userorders/:userid',async (req,res)=>{
    const orders = await Order.find({user:req.params.userid}).
    populate({path:'orderItems',populate:{path:'product',populate:'category'}}).sort({'dateOrdered':-1})
    if (!orders) {
       return res.status(500).json({success:false})
        
    }
    res.send(orders)
})

module.exports=router