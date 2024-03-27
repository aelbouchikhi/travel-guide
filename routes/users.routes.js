const express = require("express");
const usersRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} = require("../controllers/users.controllers");

usersRouter.post("/register", registerUser); // User registration
usersRouter.post("/login", loginUser); // User login
// usersRouter.post("/resetPassword", resetPassword); // Reset User Password
// usersRouter.get("/profile", getUserProfile); // Get user profile
// usersRouter.put("/profile", updateUserProfile); // Update user profile

module.exports = usersRouter;
