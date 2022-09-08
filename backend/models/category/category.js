const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    id: Number,
    image: String,
    name: {
        type:String,
        required: true},

})

exports.Category = mongoose.model('Category', categorySchema)