const express = require('express');

const router = express.Router();

const Stocks = require("../models/stock");

router.get("/test",(req,res)=> res.send("Stock routes working..."));

router.post("/", (req,res)=>{
    Stocks.create(req.body)
    .then(()=> res.json({msg:"Bag added successfully..."}))
    .catch(()=> res.status(400).json({msg:"Bag added failed..."}));
})
router.get("/",(req,res)=>{
    Stocks.find()
    .then(stocks=> res.json(stocks))
    .catch(()=> res.status(400).json({msg:"Failed to fetch stocks..."}));

});
router.get("/:id",(req,res)=>{
    Stocks.findById(req.params.id)
    .then(stocks=> res.json(stocks))
    .catch(()=> res.status(400).json({msg:"Failed to fetch stock..."}));
});
router.put("/:id",(req,res)=>{
    Stocks.findByIdAndUpdate(req.params.id,req.body)
    .then(()=> res.json({msg:"Update successfully..."}))
    .catch(()=> res.status(400).json({msg:"Failed to update stock..."}));


});
router.delete("/:id", (req,res)=>{
    Stocks.findByIdAndDelete(req.params.id)
    .then(()=> res.json({msg:"Deleted successfully..."}))
    .catch(()=> res.status(400).json({msg:"Failed to delete stock..."}));
 });



module.exports= router;