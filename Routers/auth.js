const auth_router = require("express").Router();
// const {body , validationResult} = require("express-validator");
const User = require("../DB Schema/User");
const PasswordMatching = require("../Midway/PasswordMatching");

// http://localhost:8000/auth/login
/*
Master Key
{
  "rollNo": 301602220012,
  "password": "Ashu2003"
}
*/
 auth_router.post( "/login" , async (req, res) => {
    try {
        let { password, rollNo } = req.body;
        console.log(req.body);
        let user;
        if (!password || !rollNo) {
            return req.send({
                message: "Please fill your credentials"
            });
        }
        
       
        user = await User.findOne({ RollNo: rollNo });
        
        if (!user) {
            return res.send("User Not Found");
        }
        //console.log(password);
        const correct = user.Password;

        // if (password !== correct) {
        //     return next({
        //         message: "Password is incorrect"
        //     })
        // }

        if(!PasswordMatching(password , correct)){
            return res.send("Password is incorrect");
        }
        let {Password ,...otherDetails} = user._doc;

        return res.send(otherDetails);
    }
    catch (e) {
        //console.log(e);
        //console.log(e);
        return res.send(e.message);
        // return next({
        //     statusCode: 500,
        //     message: "Login failed"
        // })
    }
})

module.exports = auth_router;