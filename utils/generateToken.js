const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      location: user.location
    },
    jwtSecret,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = generateToken;
