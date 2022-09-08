require('dotenv').config();
const express =require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const api  = process.env.API_URL;

// Routes
const productsRouter = require('./routes/products/product');

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
    console.log("What did you do");
})

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(`${api}/products`,productsRouter)


app.listen(3000,()=>{
    console.log("Server started on http://localhost:3000")
})

