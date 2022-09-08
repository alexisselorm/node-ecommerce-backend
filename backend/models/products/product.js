const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    id: Number,
    image: String,
    brand: String,
    price: Number,
    rating: Number,
    numReviews: Number,
    isFeatured: {
        type:Boolean,
        default: false},
    name: {
        type:String,
        required: true},
    description: String,
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true},

    reviews: Array,
    countInStock: Array,
    images: [{
        type:String
    }],
    richDescription: String,
    dateCreated:{
        type: Date,
        default: Date.now
    }
})

exports.Product = mongoose.model('Product', productSchema)