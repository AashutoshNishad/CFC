const mongoose = require("mongoose");

const Executives = new mongoose.Schema({
    cfcid: {
        type: String,
    },
    Permit: {
        type: Number,
    }, 
})