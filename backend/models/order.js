const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  BagCode: {
    type: String,
    required: false, // Changed to optional
  },
  BagColour: {
    type: String,
    required: false, // Changed to optional
  },
  BagQuantity: {
    type: Number,
    required: false, // Changed to optional
  },
  BagPrice: {
    type: Number,
    required: false, // Changed to optional
  },
  BagDiscount: {
    type: Number,
    required: false,
  },
  BagTotal: {
    type: Number,
    required: false, // Changed to optional
  },
  CustomerName: {
    type: String,
    required: true,
  },
  InvoiceNumber: {
    type: String,
    required: true,
  },
  GrandTotal: {
    type: Number,
    required: true,
  },
  LastDiscount: {
    type: Number,
    required: true,
  },
  SubTotal: {
    type: Number,
    required: true,
  },
  BilledBy: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);