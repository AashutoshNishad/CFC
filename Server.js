// This FIle is responsible for the run server and start all the 

const express = require('express');
const connection = require('./db_conection');
const Event_Router = require('./Routers/Event');
const userrouter = require('./Routers/User');
const authRoute = require('./Routers/auth.js');
const cores = require("cors");
const app = express(); 

const port = process.env.PORT || 8000 ;
connection();
app.use(cores());
app.use(express.json());


// this function is only for checking our API ✅✅✅✅✅✅
app.get("/" , (req , res)=>{
    res.send("<h1>hello visitor💔 </h1> <br/> <h2>  Welcome to the CFC Backend API. </h2> <hr/> Please go to the safe position  🤯🤯 ");
});

// Creating user and User related detail
app.use("/user" , userrouter);

// Security related 
app.use("/auth" , authRoute);

// event related
app.use("/event" , Event_Router );

// This function is running our sever at the 8000 port. 
app.listen( port ,  (e)=>{
    console.log("i am running at the "+port+ " port.");
})