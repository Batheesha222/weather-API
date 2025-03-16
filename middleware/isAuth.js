const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const isAuth = async (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization ? req.headers.authorization.split(" ") : [];

    const token = authorization.length > 1 ? authorization[1] : null;

    if (token) {
      const payload = jwt.verify(token, jwtSecret);

      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          location:payload.location
        };
      }
    } else {
      res.code = 400;
      throw new Error("token is required");
    }

    next();

  } catch (error) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

module.exports = isAuth;
