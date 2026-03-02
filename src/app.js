const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");

const app = express();
 
app.use(express.json());
app.use(cookieParser());

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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



