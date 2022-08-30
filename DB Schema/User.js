const mongoose = require('mongoose');

const User = new mongoose.Schema({
Name: {
    type: String,
    required: true
 },
Email: {
   type: String,
   required: true,
   unique: true,
},
Phone: {
   type: Number,
   required: true,
   unique: true,
},
Bio:{
   type: String,
   default: "The Coder.!👩‍💻"
},
Password: {
   type: String,
   require: true, 
},
CFCID: {
   type: String,
},
RollNo: {
   type: String, 
   required: true,
   unique: true,
},

})

module.exports = mongoose.model("User" , User);