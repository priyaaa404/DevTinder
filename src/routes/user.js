const express = require("express");
const userRouter = express.Router();


const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// get all the pending connections request
userRouter.get("/user/requests/recieved" , userAuth , async (req,res) => {
    try{
        const loggedInUser = req.user;
        //find returns you an array and findone returns you an object
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId" , USER_SAFE_DATA);

        res.json({
            message : "Data fetched succesfully ",
            data : connectionRequests,
        })
    }catch(err){
        req.statusCode(400).send("ERROR  " + err.message );
    }


})

// get all the accepted connections request

userRouter.get("/user/connections" , userAuth , async (req,res) => {
try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {fromUserId : loggedInUser._id , status : "accepted"},
            {toUserId : loggedInUser._id , status : "accepted"}
        ],
    }).populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

      console.log(connectionRequests);
    const data = connectionRequests.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString(   )){
            return row.toUserId;
        }
        return row.fromUserId;
    });
    res.json({data}); 
}catch(err){
    res.status(400).send({message : err.message})
}

});


// get feed
userRouter.get("/user/feed" , userAuth , async (req,res) => {
try{
    const loggedInUser = req.user;
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);


    
    // find all the connections request
    const connectionRequests = await ConnectionRequest.find({
        $or : [
            {fromUserId : loggedInUser._id },
            {toUserId : loggedInUser._id}
        ]
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach(req => {
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    })
    console.log(hideUserFromFeed);


    const users = await User.find({
       $and : [  
        {_id :{$nin : Array.from(hideUserFromFeed)} },
        {_id :{$ne : loggedInUser._id }}, 
    ],  
    }).select(USER_SAFE_DATA);


    res.send(users);
}catch(err){
    res.status(400).send({message : err.message})
}

});

module.exports = {userRouter};