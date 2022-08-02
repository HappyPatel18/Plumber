const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Email must be provide name"],
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, " Password must provide name"],
    trim: true,
    maxlength: [100, "Cannot be more than 20 characters"],
  },
});

module.exports = mongoose.model("Admin", TaskSchema); //This name is used with adding 's' behind the name for naming the collection
