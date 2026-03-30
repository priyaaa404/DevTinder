const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/login", async (req,res) => {
    try{
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            // make a jwt token
            const token = await user.getJWT();
            console.log(token);
            // send the jwt token as cookie back to user 
 
            res.cookie("token", token , {
            httpOnly: true,                 // prevents client JS access
            secure: true,                   // required for HTTPS
            sameSite: "none",               // allows cross-site cookies
            maxAge: 8 * 60 * 60 * 1000      // 8 hours

            
            }   , {
                expires : new Date(Date.now() + 8 * 3600000)
            });
            res.send(user);
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

        const savedUser = await user.save();
        
         const token = await savedUser.getJWT();
 
            res.cookie("token", token , {
                expires : new Date(Date.now() + 8 * 3600000)
            });

        res.json({ message : "user added succesfully" , data : savedUser});

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    
        res.cookie("token" , null, {
            expires : new Date(Date.now())
        });
        res.send("User logged out");

})

module.exports = { authRouter };
