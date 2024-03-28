const express = require("express");
const usersRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  resetPassword,
} = require("../controllers/users.controllers");
const { isAuth } = require("../middleware/isAuth.middleware");

usersRouter.post("/register", registerUser); // User registration
usersRouter.post("/login", loginUser); // User login
// usersRouter.post("/resetPassword", resetPassword); // Reset User Password
usersRouter.get("/profile", isAuth, getUserProfile); // Get user profile
usersRouter.put("/profile",isAuth, updateUserProfile); // Update user profile
usersRouter.delete("/profile",isAuth, deleteUserProfile); // Delete user profile

module.exports = usersRouter;