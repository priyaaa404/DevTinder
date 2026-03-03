const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true 
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true 
    },
    status : {
        type : String, 
        enum : {
            values : ["ignore", "accepted", "rejected", "interested"],
            message : `{VALUE} is incorrect data type`
        },
        required : true 
    }
    
},
{
    timestamps : true
});


connectionRequestSchema.pre("save" , function( next ){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ( " Cannot send request to yourself ")
    }
    next();
})

const connectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = {connectionRequestModel} ;
