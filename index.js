//000000000000 START 0000000000000//
const User = require("./DB Schema/User");
const connection = require("./db_conection");
connection();
const data = new User({ Name: "hello" });
data.save().then(rsp=>{
    console.log(rsp);
}).catch(err=>{
    console.log(err);
})
//00000000000 THE END 000000000000//