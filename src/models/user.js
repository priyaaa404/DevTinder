const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName : {
        type : String , 
        required : true ,
        trim : true ,
        minLength : 2
    }, 
    lastName  : {
        type : String ,
        required : true ,
        trim : true ,
        minLength : 2
    }, 
    emailId : {
        type : String ,
        required : true ,
        unique : true,
        trim : true ,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error ("Invalid email id" + value)
        //     }
        // }
    },
    password  : {
        type : String ,
        required : true ,
        trim : true
    },
    age  : {
        type : Number ,
        trim : true ,
    
    },
    gender  : {
        type : String ,
        // required : true ,
        trim : true 
    }
},
{
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);
