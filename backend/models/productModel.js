const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    Comments: { type: String, require:true}
},
    {
        timestamps: true
})

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    review: [ReviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
     
    },{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);