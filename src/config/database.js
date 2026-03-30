const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://devTinder:iNTcaTpncWFseKQH@deadpotatonode.hxlvfwk.mongodb.net/remoteDB");
    // await mongoose.connect("mongodb+srv://devTinder:iNTcaTpncWFseKQH@deadpotatonode.hxlvfwk.mongodb.net/devTinder");

}
module.exports = connectDB;



