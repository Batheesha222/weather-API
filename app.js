const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const {emailScheduler} = require ("./utils/emailScheduler")

const {userRoute, weatherRoute} = require("./routes")


const connectMongodb = require("./init/mongodb");
//init app
const app = express();

//connect database
connectMongodb();


app.use(express.json({ limit: "500mb" })); //limit 500mb to passing DATA
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true })); //extended:true because provide a warning

app.use("/api/v1/user", userRoute);
app.use("/api/v1/weather", weatherRoute);

// Start the scheduler
emailScheduler();

module.exports = app;