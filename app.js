require('dotenv').config();
const express =require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

const app = express();
/*
All http requests from external servers will be allowed by cors
*/
app.use(cors())
app.options('*',cors())
// CORS end here



const api  = process.env.API_URL;

// Routes
const productsRoutes = require('./routes/products/product');
const userRoutes = require('./routes/users/user');
const orderRoutes = require('./routes/orders/order');
const categoryRoutes = require('./routes/category/category');

// Connections
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
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
// app.use(express.static('public/uploads'))
app.use('/public/uploads',express.static('public/uploads'))

//app.use(authJwt())
app.use(errorHandler)

// Routes
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/users`,userRoutes)
app.use(`${api}/orders`,orderRoutes)
app.use(`${api}/categories`,categoryRoutes)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Server started on http://localhost:3000")
})

