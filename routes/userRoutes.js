// routes/userRoutes.js
const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");

// Define API routes
userRouter.post("/register", UserController.registerUser);
userRouter.post("/token", UserController.generateToken);

module.exports = userRouter;
