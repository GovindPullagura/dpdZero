const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create a new user
const UserController = {
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
};

module.exports = UserController;
