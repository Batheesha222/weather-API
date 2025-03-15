const { User } = require("../models")
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exist");
    }


    const newUser = new User({ name, email, password, location });

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

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }


    if (password == user.password) {

      const token = generateToken(user);

      res.status(200).json({
        code: 200,
        status: true,
        message: "User signin successfully",
        data: { user ,token },
      });
    } else {
      res.code = 401;
      throw new Error("Invalid Credentials");
    }

  } catch (error) {
    res.status(400).json({
      code: 400,
      status: false,
      message: "User signin failed",
    });
  }
};

module.exports = { signup, signin }