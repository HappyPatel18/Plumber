const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    number: {
      type: Number,
      required:true,
      unique:true,
    },
    otp:{
      type: String,
      required:true,
    },
    createdAt:{
      type:Date,
      default: Date.now,
      index: {expires:300} //After 5 min it will be deleted from DB
    }
    
  },{timestamps:true});
  
module.exports = mongoose.model("otp", otpSchema)  //This name is used with adding 's' behind the name for naming the collection

//   module.exports = mongoose.model("otp", otpSchema,"otp") //this last option is for customized name of table in mongoDb.
