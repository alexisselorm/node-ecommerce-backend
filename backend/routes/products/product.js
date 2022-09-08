const express = require('express');
const router = express.Router()
const {Product} = require('../../models/products/product');

router.get('/',async (req,res)=>{
    const products = await Product.find()
    if (!products) {
        res.status(500).json({success:false}) 
    }
    res.send(products)   
})

router.post('/',(req,res)=>{
    const product = new Product({
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        reviews: req.body.reviews,
        countInStock: req.body.countInStock,
        images: req.body.images,
        richDescription: req.body.richDescription
    })
    product.save()
    .then((createdProduct)=>{
        res.status(201).json(createdProduct)
    })
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router