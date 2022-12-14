const express = require('express');
const router = express.Router()
const {Category} = require('../../models/category/category');


router.get('/',async (req,res)=>{
    const categories = await Category.find()
    if (!categories) {
        res.status(500).json({success:false})
        
    }
    res.status(200).send(categories)
})


router.get('/:id',async (req,res)=>{
    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(500).json({success:false,
        message:"Category does not exist"})
        
    }
    res.status(200).send(category)
})

router.post('/',async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
       
    })
   category = await category.save()
   if(!category){
   return res.status(500).json({
        error: err,
        success: false
    })
   }
    res.send(category)
})

router.put('/:id', async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        icon: req.body.icon,
        image: req.body.image,
    },
    {new:true})
    if(!category){
        return res.status(500).json({
             error: err,
             success: false
         })
        }
         res.send(category)
})

router.delete('/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then((category)=>{
        if(category){
            return res.status(200).json({
                success:true,
                mesage:"Category deleted"
            })
        }else{
            return res.status(200).json({
                success:false,
                mesage:"Category not found"
            })
        }
    })
    .catch((err)=>{
        return res.status(400).json({
            error: err,
            success:false,
            message:"Some error occurred"})
    })
})

module.exports=router