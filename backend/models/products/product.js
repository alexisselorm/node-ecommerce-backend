const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    id: Number,
    image: String,
    brand: String,
    price: Number,
    rating: Number,
    numReviews: Number,
    isFeatured: Boolean,
    name: {
        type:String,
        required: true},
    description: String,
    category: String,
    reviews: Array,
    countInStock: Array,
    images: Array,
    richDescription: String
})

exports.Product = mongoose.model('Product', productSchema)