const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js")
const requestRouter = express.Router();
const User = require("../models/user.js");

requestRouter.post("/request/send/:status/:toUserId", 
    userAuth , 
     async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // the allowed status that you can send to a person
        const allowedStatus = ["ignored" , "interested"];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({ message : "Invalid status type : " + status})
        }

        // id there's an existing connectionrequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
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

        // check is user exists before we send a request
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res
            .status(400)
            .json({message : "User doesn't exist "})
        }

        // what if someone sends request to himself???
        // pre middleware written in connectionRequest schema, anything i save in this b will go through this middleware

        const connectionRequest = new ConnectionRequest(
            {
                fromUserId, 
                toUserId , 
                status,
            }
        )
        const data = await connectionRequest.save();
        
        res.json({
            message : req.user.firstName + " " +  status +  " " + toUser.firstName,
            data,
        });

    } catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", 
    userAuth , 
     async (req,res) => {
    try{
        const loggedInUser = req.user;
        const {requestId ,status} = req.params;
        
        // validate status/.
        const allowedStatus = [ "accepted" , "rejected" ];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message : "Status not allowed"   })
        }

        //requestid should exist in db and the loggedinuser === toUserId and   //  status === interested
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested" , 
        });
        if(!connectionRequest){
            return res
            .status(400)
            .json({message : "Connection Request Nott found"   })
        }
       
        connectionRequest.status = status;      
        const data = await connectionRequest.save();
        res.json({message : "Connection request " + status  +  " "  + data})  ;  

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
})


module.exports = { requestRouter };