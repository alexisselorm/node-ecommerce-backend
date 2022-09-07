require('dotenv').config();
const express =require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();
const api  = process.env.API_URL

// Connections
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: 'udemy-eshop'
})
.then(()=>{
    console.log("Connection successful");
})
.catch(()=>{
    console.log("What did tyou do nigga");
})

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// console.log(process.env.CONNECTION_STRING);
const productSchema = mongoose.Schema({
    id: Number,
    image: String,
    brand: String,
    price: Number,
    rating: Number,
    numReviews: Number,
    isFeatured: Boolean,
    name: String,
    description: String,
    category: String,
    reviews: Array,
    countInStock: Array,
    images: Array,
    richDescription: String
})

const Product = mongoose.model('Product', productSchema)

app.listen(3000,()=>{
    console.log("Server started on http://localhost:3000")
})

app.get(`${api}/products`,async (req,res)=>{
    const products = await Product.find()
    res.send(products);
})

app.post(`${api}/products`,(req,res)=>{
    const product = req.body
    console.log(product)    
    res.send(product);
})