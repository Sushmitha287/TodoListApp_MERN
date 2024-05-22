
require("dotenv").config();

// import express
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path");
// create an instance of express called app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req,res) => {
    ressendFile(path.join(__dirname, "build/index.html"));
})
// import our todos router
const router = require("./routes");

// use /api to prefix our endpoints
app.use("/api", router);


// create a port variable
const port = process.env.PORT || 5000;

async function startServer (){
    await connectToMongoDB();
    // listen to our server on our localhost
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();