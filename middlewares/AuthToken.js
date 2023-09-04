const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, "dpdzero");
      if (decoded) {
        next();
      }
    } catch (error) {
      res
        .status(401)
        .send({
          status: "error",
          code: "INVALID_TOKEN",
          message: "Invalid access token provided",
        });
    }
  } else {
    res.status(401).send({ msg: "Token required" });
  }
};

module.exports = { auth };
