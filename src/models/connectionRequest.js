const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        type : String, 
        enum : {
            values : ["ignore", "accepted", "rejected", "interested"],
            message : `{VALUE} is incorrect data type`
        }
    }
    
},
{
    timestamps : true
});

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);
