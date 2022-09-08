const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    id: Number,
    image: String,
    name: {
        type:String,
        required: true},

})

exports.Order = mongoose.model('Order', orderSchema)