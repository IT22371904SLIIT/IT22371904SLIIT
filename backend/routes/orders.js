const express = require('express');
const router = express.Router();
const Order = require("../models/order");

// Test route
router.get("/test", (req, res) => res.send("Order routes working..."));

// Create new order
router.post("/", (req, res) => {
    Order.create(req.body)
        .then(() => res.json({ msg: "Order added successfully..." }))
        .catch(() => res.status(400).json({ msg: "Order addition failed..." }));
});

// Fetch all orders
router.get("/", (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(() => res.status(400).json({ msg: "Failed to fetch orders..." }));
});

// Fetch a single order by ID
router.get("/:id", (req, res) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(() => res.status(400).json({ msg: "Failed to fetch order..." }));
});

// Update an order by ID
router.put("/:id", (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.json({ msg: "Update successful..." }))
        .catch(() => res.status(400).json({ msg: "Failed to update order..." }));
});

// Delete an order by ID
router.delete("/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted successfully..." }))
        .catch(() => res.status(400).json({ msg: "Failed to delete order..." }));
});

module.exports = router;
