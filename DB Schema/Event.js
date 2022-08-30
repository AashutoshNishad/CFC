const mongoose = require("mongoose");

const User = new mongoose.Schema({
  Title: {
    type: String,
    default: "Untitled",
    length: { max: 200 },
    required: true,
  },
  Date: {
    type: Date,
   //  require: true,
  },
  venue: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    default: "Coming Soon",
    required: true,
  },
  
});

module.exports =  mongoose.model("Event", User);
