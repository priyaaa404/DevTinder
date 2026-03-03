const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const {connectionRequestModel} = require("../models/connectionRequest.js")
const requestRouter = express.Router();
const User = require("../models/user.js");


requestRouter.post("/request/send/:status/:toUserId", 
    userAuth , 
    async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        const toUserExists = await User.findById( toUserId);
        if(!toUserExists){
            return res
            .status(400)
            .json({message : "User doesn't exist "})
        }

        const allowedStatus = ["ignored" , "interested"];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({ message : "Invalid status type : " + status})
        }

        // id there's an existing user
        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or : [
                {fromUserId , toUserId} , 
                {fromUserId : toUserId , toUserId : fromUserId}
            ],
        });
        if(existingConnectionRequest){
            return res
            .status(400)
            .send({ message : "Connection request already exists"})
        }


        const connectionRequest = new connectionRequestModel(
            {
                fromUserId, 
                toUserId , 
                status
            }
        )

        const data = await connectionRequest.save();
        // res.send(user.firstName + " sent a connection request") , data};
        res.json({
            message : "Connection request sent succesfully",
            data,
        })

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
})


requestRouter.post("/request/review/:status/:toRequestId", userAuth , async (req,res) => {
    try{
        const loggedInUser = req.user;
        const {requestId ,status} = req.params;

        const allowedstatus = ["accepted" , "rejected"];
        if(!allowedstatus.includes(status)){
            return res
            .status(400)
            .json({message : "Status not allowed"   })
        }

        const connectionRequest = await connectionRequestModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested" , 
        });
        if(!connectionRequest){
            return res
            .status(400)
            .json({message : "Connection Request Not found"   })
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message : "Connection request" + status , data})  ;  

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
})

module.exports = { requestRouter };
