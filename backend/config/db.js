const mongoose = require('mongoose');

const dburl = "mongodb+srv://dmaxlankapvtltd:Kavindu18192@cluster0.gzr3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true,"useNewUrlParser", true); 

const connection = async ()=>{
    try{
        await mongoose.connect(dburl);
        console.log("MongoDb connected");
    }catch(e){
        console.error(e.message);
        process.exit();
    }
};
module.exports = connection;