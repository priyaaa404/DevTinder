const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req,res) => {
    try{
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

            // make a jwt token
            const token = await jwt.sign({_id : user._id}, "Devtinderhollaback", {expiresIn: "1d"});
            console.log(token);
            // send the jwt token as cookie back to user 
 
            res.cookie("token", token);
            res.send("Login succesfully");
        } else {
            throw new Error("Invalid credentials");        }

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
});

//posts user in db
authRouter.post("/signUp", async (req,res) => {
    try{

        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password , 10);

        const user = new User({     
        firstName,
        lastName,
        emailId,
        password : passwordHash,
        });

        await user.save();
        res.send("user added succesfully");

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    
        res.cookie("token" , null, {
            expires : new Date(Date.now())
        });
        res.send("User logges out");

})

module.exports = { authRouter };
