const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const requestRouter = express.Router();


requestRouter.post("/connectionReq" , async (req,res) => {
    try{
        const user = req.user;
        console.log("sending a connection request");

        res.send(user.firstName + " sent a connection request")

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
})


module.exports = { requestRouter };
