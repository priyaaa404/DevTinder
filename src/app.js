const express = require("express");
const connectDB = require("./config/database.js")

const app = express();

 
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



