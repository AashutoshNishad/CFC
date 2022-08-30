// This file is used by the server to build connection to the database. 📝📝📝📝


var connection = async ()=>{

    const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/CFC").then((con)=>{
    console.log("connection successful  👍👍");
}).catch((err)=>{
    console.error("There is some Error : \n " + err);
})
}
module.exports = connection;