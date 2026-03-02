const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const user = require("./models/user.js");

// app.post("/signUp", async (req,res) => {
//     const user = new User({
//         firstName : "priya", 
//         lastName : "sharma",
//         emailId : "sharma.priya162002@gmail.com",
//         password : "priya123"
//     });

//     await user.save();
//     res.send("User added succesfully");
// });
 
app.use(express.json());

//posts user in db
app.post("/signUp", async (req,res) => {
    try{

        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password , 10);

        const user = new User({     
        firstName,
        lastName,
        emailId,
        password : passwordHash,
        });

        await user.save();
        res.send("user added succesfully");

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
});

app.post("/login", async (req,res) => {
    try{
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("Login succesfully");
        } else {
            throw new Error("Invalid credentials");        }

    } catch (err){
        res.status(400).send("ERROR" + err.message);
    }
})


// finds user by email
app.get("/user", async (req,res) => {
    const userEmailId = req.body.emailId;

    try{
     const user = await User.find( { emailId : userEmailId});
     res.send(user);
    } catch (err){
        res.status(400).send("cannot find user");
    }
    
});
// gets all users
app.get('/feed', async (req,res) => {
    try{
        const user = await User.find({});
        res.send(user); 
    } catch (err) {
        res.status(400).send("cannot find user");
    }
});

app.delete('/user', async (req,res) => {
    
    const userId  =  req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted succesfully"); 
    } catch (err) {
        res.status(400).send("cannot find user");
    }
});

app.patch('/user', async (req,res) => {
    const userId = req.body.userId;
    const data  =  req.body;

    try{
        await User.findByIdAndUpdate({_id : userId}, data);
        res.send("user updated succesfully"); 
    } catch (err) {
        res.status(400).send("cannot find user");
    }
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



