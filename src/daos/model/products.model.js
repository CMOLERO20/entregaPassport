const mongoose = require("mongoose");

const productCollection = "products";

const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnail:{
            type: String,
        },
        code: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },

});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel;