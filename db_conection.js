// This file is used by the server to build connection to the database. 📝📝📝📝

const MONGO_URL = process.env.MONGODB_URL  ;
;

var connection = async ()=>{

    const mongoose = require('mongoose');
mongoose.connect(MONGO_URL).then((con)=>{
    console.log("connection successful  👍👍");
}).catch((err)=>{
    console.error("There is some Error : \n " + err);
})
}
module.exports = connection;