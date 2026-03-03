const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");


userRouter.get("/user/requests/recieved" , userAuth , async (req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId : loggedInUser._id
        })

        res.json({
            message : "Data fetched succesfully " , 
            data : connectionRequests
        })

    }catch (err){
        res.status(400).send("ERROR : " + err.message)
    }

})


module.exports = userRouter;