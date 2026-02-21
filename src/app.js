const express = require('express');

const app = express();


app.use((req, res) => {
    res.send("Hello rom the server.");
});

app.listen(3000, () => {
    console.log("Server is running")}  // will only be called once my server is up and running.
);
