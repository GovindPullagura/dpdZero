const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, "dpdzero");
      if (decoded) {
        res.send("Validation Success");
        next();
      }
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  } else {
    res.status(401).send({ msg: "Token required" });
  }
};

module.exports = { auth };
