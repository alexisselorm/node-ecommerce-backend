const express = require('express');
const router = express.Router()
const {Category} = require('../../models/category/category');


router.get('/',async (req,res)=>{
    const categories = await Category.find()
    if (!categories) {
        res.status(500).json({success:false})
        
    }
    res.send(categories)
})

router.post('/',(req,res)=>{
    const category = new category({
        image: req.body.image,
        name: req.body.name,
       
    })
    category.save()
    .then((createdCategory)=>{
        res.status(201).json(createdCategory)
    })
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router