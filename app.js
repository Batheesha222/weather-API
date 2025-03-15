const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const {userRoute} = require("./routes")


const connectMongodb = require("./init/mongodb");
//init app
const app = express();

//connect database
connectMongodb();


app.use(express.json({ limit: "500mb" })); //limit 500mb to passing DATA
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true })); //extended:true because provide a warning

app.use("/api/v1/user", userRoute);


module.exports = app;