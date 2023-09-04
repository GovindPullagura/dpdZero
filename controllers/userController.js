const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const UserController = {
  // Create a new user

  registerUser: async (req, res) => {
    try {
      const { username, email, password, full_name, age, gender } = req.body;

      const requiredFields = [
        "username",
        "email",
        "password",
        "full_name",
        "age",
        "gender",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        res.status(400).json({
          status: "error",
          code: "INVALID_REQUEST",
          message: `Invalid request. Please provide all required fields: ${missingFields.join(
            ", "
          )}.`,
        });
        return; // Exit the function early
      }

      // password validation before hashing
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_PASSWORD",
          message:
            "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
        });
      }

      // hashing the password:
      let hashedPassword = await bcrypt.hashSync(password, 5);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        full_name,
        age,
        gender,
      });
      const user_id = newUser.id;
      res.status(201).json({
        status: "success",
        message: "User successfully registered!",
        data: {
          user_id,
          username,
          email,
          full_name,
          age,
          gender,
        },
      });
    } catch (error) {
      // Error Handling:

      console.log(error);
      if (error.name == "SequelizeValidationError") {
        if (error.errors[0].message == "Invalid Password.") {
          res.status(400).send({
            status: "error",
            code: "INVALID_PASSWORD",
            message:
              "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
          });
        } else if (error.errors[0].message == "Invalid age.") {
          res.status(400).send({
            status: "error",
            code: "INVALID_AGE",
            message: "Invalid age value. Age must be a positive integer.",
          });
        } else if (error.errors[0].message == "Invalid gender.") {
          res.status(400).send({
            status: "error",
            code: "GENDER_REQUIRED",
            message:
              "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
          });
        }
      } else if (error.name == "SequelizeUniqueConstraintError") {
        if (error.fields.username) {
          res.status(400).send({
            status: "error",
            code: "USERNAME_EXISTS",
            message:
              "The provided username is already taken. Please choose a different username.",
          });
        } else if (error.fields.email) {
          res.status(400).send({
            status: "error",
            code: "EMAIL_EXISTS",
            message:
              "The provided email is already registered. Please use a different email address.",
          });
        }
      } else {
        res.status(500).send({
          status: "error",
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error occurred. Please try again later.",
        });
      }
    }
  },

  // Token generation:
  generateToken: async (req, res) => {
    try {
      const { username, password } = req.body;

      const requiredFields = ["username", "password"];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          status: "error",
          code: "MISSING_FIELDS",
          message: `Missing fields. Please provide both username and password.`,
        });
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({
          status: "error",
          code: "INVALID_CREDENTIALS",
          message:
            "Invalid credentials. The provided username or password is incorrect.",
        });
      }
      // Validate the user's password
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({
          status: "error",
          code: "INVALID_CREDENTIALS",
          message:
            "Invalid credentials. The provided username or password is incorrect.",
        });
      }

      // If the credentials are valid, generate a JWT
      const token = jwt.sign({ username: user.username }, "dpdzero", {
        expiresIn: 3600, // Adjusted the expiration time as 3600 seconds
      });

      // Return the token in the response
      res.status(200).send({
        status: "success",
        message: "Access token generated successfully.",
        data: {
          access_token: token,
          expires_in: 3600,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error occurred. Please try again later.",
      });
    }
  },
};

module.exports = UserController;
