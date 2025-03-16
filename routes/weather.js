const express = require("express");
const router = express.Router();
const { weatherController } = require("../controllers")
const isAuth = require("../middleware/isAuth");


router.get("/current-weather" , isAuth, weatherController.currentWeather)


router.get("/weather-for-date/:date" , isAuth, weatherController.weatherForDate)




module.exports = router;