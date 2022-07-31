const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "must provide name"],
        trim:true,
    },
    code:{
        type: String,
        trim:true,
    }
  })
  
  
  module.exports = mongoose.model("product", ProductSchema)  //This name is used with adding 's' behind the name for naming the collection