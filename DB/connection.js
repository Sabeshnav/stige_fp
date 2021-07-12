const mongoose = require('mongoose');
const URI = "mongodb+srv://fpDBuser:fpDBuser@cluster0.3qfr9.mongodb.net/SFPDB?retryWrites=true&w=majority";
const connectDB = async()=>{
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected");
}
module.exports = connectDB;