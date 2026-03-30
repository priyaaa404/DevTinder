const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
try{
const {token} = req.cookies;
if(!token){
    return res.status(401).send("Please Login");
}

const decodedUser = await jwt.verify(token, process.env.JWT_SECRETKEY);

const {_id} = decodedUser;
const user = await User.findById(_id);

if(!user){
    throw new Error("Invalid user");
}

req.user = user;
next();
} catch (err){
    res.status(400).send("ERROR: " + err.message);   
}

}


module.exports = { userAuth};