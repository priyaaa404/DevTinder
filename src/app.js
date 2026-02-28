const express = require("express");

const app = express();

app.get("/test", (req,res) => {
    res.send({
        first_name : "Priya",
        last_name  : "Sharma"
    })}
);

app.post("/test", (req,res) => {
    res.send("DB Is saved succesfully")} 
);



app.listen(3000, () => {
    console.log("Server is active");
});
