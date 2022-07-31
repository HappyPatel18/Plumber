const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    product:{
        type: String,
        required: [true, "must provide product name"],
        trim:true,
    },
    userid:{
        type: String,
        required: [true, "must provide userid name"],
        trim:true,
    },

    warranty:{
      type: String,
      required: [true, "must provide warranty"],
      trim:true,
    },
    issue:{
        type: String,
        required: [true, "must provide issue description"],
        trim:true,
    },
    timeslot:{
        type: String,
        required: [true, "must provide time slot"],
        trim:true,
    },
    address:{
        type: String,
        required: [true, "must provide address"],
        trim:true,
    },
  })
  
  
  module.exports = mongoose.model("complaint", TaskSchema)  //This name is used with adding 's' behind the name for naming the collection