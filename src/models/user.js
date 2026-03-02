const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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
        trim : true ,
        enum : {
            values : ["male", "female", "others"],
            message : `{VALUE} is incorrect data type`
        }
    },
    photoUrl : {
        type : String ,
        trim : true 
    },
    about : {
        type : String ,
        trim : true 
    }
    
},
{
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);
