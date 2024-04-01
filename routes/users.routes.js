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
const { upload } = require("../middleware/multer.helpers");
const { xssMiddleware } = require("../middleware/xss.middleware");
const { validatorMiddleware } = require("../middleware/expresssValidator.middleware");

usersRouter.post("/register", upload.single("images"), xssMiddleware, validatorMiddleware, registerUser); // User registration
usersRouter.post("/login", loginUser); // User login
usersRouter.post("/resetPassword", resetPassword); // Reset User Password
usersRouter.get("/verify/:token", verifyEmail);
// usersRouter.get("/profile", getUserProfile); // Get user profile
// usersRouter.put("/profile", updateUserProfile); // Update user profile

module.exports = usersRouter;
