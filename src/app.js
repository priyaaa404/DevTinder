const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");


app.post("/signUp", async (req,res) => {
    const user = new User({
        firstName : "priya", 
        lastName : "sharma",
        emailId : "sharma.priya162002@gmail.com",
        password : "priya123"
    });

    await user.save();
    res.send("User added succesfully");
});
 
connectDB()
.then(() => {   
    console.log("db success")
    app.listen(3000, () => {
    console.log("Server is active");
    });
})
.catch((err) => {
        console.error("db failed");
});



