const express = require("express");
const usersRouter = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  resetPassword,
  verifyEmail,
  userRegister,
  userLogin,
} = require("../controllers/users.controllers");
const { xssMiddleware } = require("../middleware/xss.middleware");
const { validatorMiddleware } = require("../middleware/expresssValidator.middleware");
const { upload } = require("../middleware/multer.middleware");
const { isAuth } = require("../middleware/isAuth.middleware");

usersRouter.post("/register", upload.single("images"), xssMiddleware, validatorMiddleware, registerUser); // User registration
usersRouter.post("/login", loginUser); // User login
usersRouter.post("/resetPassword", resetPassword); // Reset User Password
usersRouter.get("/verify/:token", verifyEmail);
// usersRouter.get("/profile", getUserProfile); // Get user profile
// usersRouter.put("/profile", updateUserProfile); // Update user profile
// usersRouter.post("/resetPassword", resetPassword); // Reset User Password
usersRouter.get("/profile", isAuth, getUserProfile); // Get user profile
usersRouter.put("/profile",isAuth, upload.single("image"), updateUserProfile); // Update user profile
usersRouter.delete("/profile",isAuth, deleteUserProfile); // Delete user profile

module.exports = usersRouter;