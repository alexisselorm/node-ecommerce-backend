const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const multer = require('multer')
const {Product} = require('../../models/products/product');
const {Category} = require('../../models/category/category');

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]

        let uploadError = new Error('invalid image type')
        if (isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ','-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${fileName}-${uniqueSuffix}.${extension}` )
    }
  })
  
  const upload = multer({ storage: storage 
})


router.get('/',async (req,res)=>{
    let filter = {};
    if(req.query.categories){
        filter = {category:req.query.categories.split(',')}
    }
    const products = await Product.find(filter).populate('category')
    if (!products) {
        res.status(500).json({success:false}) 
    }
    res.send(products)   
})

router.get('/:id',async (req,res)=>{
    const products = await Product.findById(req.params.id).populate('category')
    if (!products) {
        res.status(500).json({success:false}) 
    }
    res.send(products)   
})

router.get('/get/count',async (req,res)=>{
    const productsCount = await Product.countDocuments()
    if (!productsCount) {
        res.status(500).json({success:false}) 
    }
    res.send({count:productsCount})   
})

router.get('/get/featured/:count',async (req,res)=>{
    const count = req.params.count ? req.params.count : 0
    const Featuredproducts = await Product.find({isFeatured:true}).limit(Number(count))
    if (!Featuredproducts) {
        res.status(500).json({success:false}) 
    }
    res.send(Featuredproducts)   
})

router.post('/',upload.single('image'),async (req,res)=>{
    
    const file = req.file
    if(!file) return res.status(400).send("Image is missing from the request")
    const category = await Category.findById(req.body.category)
    // console.log(category);
    if(!category) return res.status(400).send("Error with category")
    const fileName = req.file.filename
    const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`
    let product = new Product({
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        image: `${baseUrl}${fileName}`,
        isFeatured: req.body.isFeatured,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        reviews: req.body.reviews,
        countInStock: req.body.countInStock,
        images: req.body.images,
        richDescription: req.body.richDescription
    })
    product = await product.save() 
    if(!product){
       return res.status(201).json({
            error: err,
            success: false
        })
    }else{
        return res.send(product)
    }
})

router.put('/:id',upload.single('image'),async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Error with category id")
    }
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send("Error with category")

    const productId = await Product.findById(req.params.id)
    if(!productId) return res.status(400).send('Invalid product')
    
    let imagepath;
    const file = req.file
    if(file){

        const fileName = req.file.filename
        const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`
        imagepath = `${baseUrl}${fileName}`
    }else{
        imagepath = product.iamge
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id,{
        brand: req.body.brand,
        price: req.body.price,
        image: imagepath,
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
    },{
        new:true
    })
    if(!product){
       return res.status(500).json({
            success: false
        })
    }else{
         res.send(product)
    }
})

router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then((product)=>{
        if(product){
            return res.status(200).json({
                success:true,
                mesage:"product deleted"
            })
        }else{
            return res.status(200).json({
                success:false,
                mesage:"product not found"
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