const express = require("express");
const usersRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  verifyEmail,
} = require("../controllers/users.controllers");
const { upload } = require("../helpers/multer.helpers");

usersRouter.post("/register", upload.single("images"), registerUser); // User registration
usersRouter.post("/login", loginUser); // User login
usersRouter.post("/resetPassword", resetPassword); // Reset User Password
usersRouter.get("/verify/:token", verifyEmail);
// usersRouter.get("/profile", getUserProfile); // Get user profile
// usersRouter.put("/profile", updateUserProfile); // Update user profile

module.exports = usersRouter;
