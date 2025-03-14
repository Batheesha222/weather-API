const {User} = require("../models")

const signup = async (req, res) => {
    try {
      const { name, email, location } = req.body;
  
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        res.code = 400;
        throw new Error("Email already exist");
      }


      const newUser = new User({ name, email, location });
  
      await newUser.save();
      res.status(201).json({
        code: 201,
        status: true,
        message: "User registered successfully",
      });
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: false,
            message: "User registration failed",
          });
    }
  };

  module.exports = {signup}