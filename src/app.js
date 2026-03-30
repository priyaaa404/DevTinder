const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// const dns = require("dns");
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
// import dns from 'dns';

const app = express();

app.use(cors({
    origin : ["http://localhost:5173" ,
    "https://dev-tinder-app-xi.vercel.app"],
    credentials : true ,
})); 
app.use(express.json());
app.use(cookieParser());

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
const {userRouter} = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
.then(() => {   
    console.log("DB success")
    app.listen(process.env.PORT, () => {
    console.log("Server is active on 3000");
    });
})
.catch((err) => {
        console.error("db connection failed" , err);
});
  


