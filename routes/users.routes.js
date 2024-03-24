const express = require("express");
const usersRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} = require("./controllers/users.controllers");

router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login
router.post("/resetPassword", resetPassword); // Reset User Password
router.get("/profile", getUserProfile); // Get user profile
router.put("/profile", updateUserProfile); // Update user profile

module.exports = usersRouter;
