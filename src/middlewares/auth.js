const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
try{
const {token} = req.cookies;
if(!token){
    throw new Error("Invalid token");
}

const decodedUser = await jwt.verify(token, "Devtinderhollaback");

const {_id} = decodedUser;
const user = await User.findById(_id);

if(!user){
    throw new Error("Invalid user");
}

req.user = user;

next();
} catch (err){
    res.status(400).send("ERROR" + err.message);   
}

}


module.exports = { userAuth};