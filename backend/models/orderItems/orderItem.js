const mongoose = require('mongoose');


const orderItemSchema = mongoose.Schema({
    quantity: Number,
    product: {
        type:mongoose.Schema.Type.ObjectId,
        ref:'Product',
        required: true},

});

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema)