const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ODescription: {
        type: String,  // Changed from Number to String
        required: true,
    },
    OColour: {
        type: String,
        required: true,
    },
    OQuantity: {
        type: Number,
        required: true,
    },
    OPrice: {
        type: Number,
        required: true,
    },
    ODiscount: {
        type: Number,
        required: true,
    },
    OTotal: {
        type: Number,
        required: true,
    },
    Cname: {
        type: String,
        required: true,
    },
    Invoice: {
        type: Number,
        required: true,
    },
    GTotal: {
        type: Number,
        required: true,
    },
    Ldiscount: {
        type: Number,
        required: true,
    },
    STotal: {
        type: Number,
        required: true,
    },
    Billedby: {
        type: String,
        required: true,
    },
    Total: {  // Changed from tot to Total
        type: Number,
        
    },
});

module.exports = mongoose.model("Order", OrderSchema);
