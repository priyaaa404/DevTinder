const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            values : ["male", "female", "others", "Male", "Female" ],
            message : `{VALUE} is incorrect gender type`
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

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY , {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
