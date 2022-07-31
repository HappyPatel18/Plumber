const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const TaskSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "Number must be provided"],
    unique:true,
    trim: true,
  },

},{timestamps:true});

TaskSchema.method.generateJWT = function(){
  const token =jwt.sign({
    _id:this._id,
    number:this.number
  },"HASHHSADHASDHasdasdfgsds",{expiresIn:"5d"});
  return token;
}


module.exports = mongoose.model("Register", TaskSchema); //This name is used with adding 's' behind the name for naming the collection
