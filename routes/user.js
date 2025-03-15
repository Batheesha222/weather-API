const express = require("express");
const router = express.Router();
const { userController } = require("../controllers")
const isAuth = require("../middleware/isAuth");


router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.put("/update-location" , isAuth, userController.updateLocation)

module.exports = router;