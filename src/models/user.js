const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : "string"
    }, 
    lastName  : {
        type : "string"
    }, 
    emailId : {
        type : "string"
    },
    password  : {
        type : "string"
    },
    age  : {
        type : Number
    },
    gender  : {
        type : "string"
    }
});

module.exports = mongoose.model("User", userSchema);
