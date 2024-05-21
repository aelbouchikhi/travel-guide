const express = require("express");
const {
  adminControllers,
  manageUsers,
  managePosts,
  manageHotels,
  manageRestaurants,
} = require("../controllers/admin.controllers");
const { isAuth } = require("../middleware/isAuth.middleware");
const { xssMiddleware } = require("../middleware/xss.middleware");
const { upload } = require("../middleware/multer.middleware");
const adminRouter = express.Router();

// admin routes

adminRouter.post("/login", xssMiddleware, adminControllers.loginAdmin);
adminRouter.post(
  "/adduser",
  upload.single("image"),
  isAuth.admin,
  xssMiddleware,
  adminControllers.addAdminUser
);

// manage users

adminRouter.get("/userbyid/:id", isAuth.admin, manageUsers.getUsersById);
adminRouter.get("/allusers", /*isAuth.admin,*/ manageUsers.getAllUsers);
adminRouter.put(
  "/updateuser/:id",
  upload.single("image"),
  isAuth.admin,
  xssMiddleware,
  manageUsers.updateUserById
);
adminRouter.delete("/userbyid/:id", isAuth.admin, manageUsers.delUsersById);

// manage post

adminRouter.post(
  "/addhotel",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  managePosts.addPost
);
adminRouter.get("/postnotverified", isAuth.admin, managePosts.getAllPost);
adminRouter.get(
  "/postnotverified",
  isAuth.admin,
  managePosts.getAllPostNotVerified
);
adminRouter.get(
  "/allpostsvirified",
  isAuth.admin,
  managePosts.getAllPostVerified
);
adminRouter.post(
  "/postverified/:id",
  isAuth.admin,
  xssMiddleware,
  managePosts.verifiedPost
);
adminRouter.post(
  "/postunverified/:id",
  isAuth.admin,
  xssMiddleware,
  managePosts.unverifiedPost
);
adminRouter.put(
  "/updatepost/:id",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  managePosts.updatePostById
);
adminRouter.delete("/delpost/:id", isAuth.admin, managePosts.delPostById);

// manage hotel

adminRouter.post(
  "/addhotel",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  manageHotels.addHotel
);
adminRouter.get("/hotel", isAuth.admin, manageHotels.getAllHotel);
adminRouter.get("/hotel/:id", isAuth.admin, manageHotels.getHotelById);
adminRouter.put(
  "/updatehotel/:id",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  manageHotels.updateHotelById
);
adminRouter.delete("/delhotel/:id", isAuth.admin, manageHotels.delHotelById);

// //manage restaurant

adminRouter.post(
  "/addrestaurant",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  manageRestaurants.addRestaurant
);
adminRouter.get(
  "/restaurant",
  isAuth.admin,
  manageRestaurants.getAllRestaurant
);
adminRouter.get(
  "/restaurant/:id",
  isAuth.admin,
  manageRestaurants.getRestaurantById
);
adminRouter.put(
  "/updaterestaurant/:id",
  isAuth.admin,
  upload.array("images"),
  xssMiddleware,
  manageRestaurants.updateRestaurantById
);
adminRouter.delete(
  "/delrestaurant/:id",
  isAuth.admin,
  manageRestaurants.delRestaurantById
);

module.exports = adminRouter;
