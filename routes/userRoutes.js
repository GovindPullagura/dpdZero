// routes/userRoutes.js
const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");

// Define API routes
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
