// This FIle is responsible for the run server and start all the 

const express = require('express');
const connection = require('./db_conection');
const Event_Router = require('./Routers/Event');
const userrouter = require('./Routers/User');
const authRoute = require('./Routers/auth.js');
const cores = require("cors");
const app = express(); 
connection();
app.use(cores());
app.use(express.json());
// this code if only for check ✅✅✅✅✅✅
app.get("/" , (req , res)=>{
    res.send("<h1>hello visitor💔 </h1> <br/> <h2>  Welcome to the CFC Backend API. </h2> <hr/> Please go to the safe position  🤯🤯 ");
});

app.use("/user" , userrouter);
app.use("/auth" , authRoute);
app.use("/event" , Event_Router );

// this code is running our sever at the 8000 port. 
app.listen( 8000 ,  (e)=>{
    console.log("i am running at the 8000 port.");
})