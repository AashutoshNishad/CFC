const express = require("express");
const User = require("../DB Schema/User");
const userrouter = express.Router();
const { body, validationResult } = require("express-validator");

userrouter.post(
  "/new_user",
  [
    body("Name", "Correct name").isLength({ max: 30 }),
    body("Email").isEmail().custom(async (value)=>{
      console.log(value);
      try {
        const rsp = await User.findOne({Email: value});
        if(rsp == null)
            return true;
            
        return Promise.reject("Email already Exist.");
      } catch (error) {
        console.log(error);
        return Promise.reject("Internal Server Error. ");
      }
      
 
    }),
    body(
      "Password",
      "Please follow the correct rules for the password."
    ).custom((value) => {

       if (value == value.toLowerCase())
        return Promise.reject("Password must contain a Uppercase character");


      return true;
    }),
    body("Phone").custom(async (value) => {
      // var ashu = "Hello";
      if( !((String(value)).length == 10))
        Promise.reject("Phone number must be 10 numbers.");
        
      try {
      const rsp = await User.findOne({Phone: value});
      if(rsp == null)
         {
          return true;
         }
  
      return Promise.reject("Mobile number already Exist.");
    } catch (error) {
        console.log(error);
        
    }
      
    }),
    body("college", "Enter Correct length in college felid.").isLength({
      max: 200,
    }),
    body("branch").custom(value =>{
            var options = ["CSE" , "ET&T" , "EEE" , "CIVIL" , "MECH"]

            for (let index = 0; index < options.length; index++) {
              const element = options[index];
              if(element == value.toUpperCase())
              {
                return true;
              }
            }
            return Promise.reject("branch is not correct");
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(errors.array());

    try {
      
 
    var { Name, Email, Phone, Password, College,RollNo, Year, Branch } = req.body;
    // creating a new user object
    const new_user = new User({
      Name,
      Email,
      Phone,
      Password,
      College,
      Year,
      Branch,
      RollNo
    });

    const response = await new_user.save();

    res.send({
      success: true,
      Msg:"Congratulations "+ response.Name + "! , you are registered as CFC member",
      data: {
        Name: response.Name,
        Email: response.Email,
        College: response.College
      }
    });
  } catch (error) {
    console.log(error);
      res.send("Internal Server Error ! ");
  }
  }
  
);


userrouter.get("/fetch_user" , async (req,res)=>{
 var Email = req.header("Email");
console.log(Email);
 try {
  var rsp = await User.findOne({ Email: Email }).select("-_id").select("-_v").select("-Password");
  return res.send(rsp);
 } catch (error) {
 return  res.send("internal server Error");
 }
})
// express - validator;
module.exports = userrouter;
