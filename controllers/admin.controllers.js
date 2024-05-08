const {
  SERVER_NOT_FOUND_HTTP_CODE,
  NO_USER_FOUND,
  SERVER_OK_HTTP_CODE,
  SERVER_UNAUTHORIZED_HTTP_CODE,
  ACCESS_DENIED,
  USER_NOT_FOUND,
  POST_FAILURE_MESSAGE,
} = require("../config/constants.config");
const { bcryptFunction } = require("../helpers/bcrypt.helpers");
const { tokenFunction } = require("../helpers/jwt");
const { adminQuery } = require("../models/methods/adminQuery.methods");
const hotelSchema = require("../models/schema/hotel.schema");
const postSchema = require("../models/schema/post.schema");
const userSchema = require("../models/schema/user.schema");

exports.adminControllers = {
  async addAdminUser(req, res) {
    try {
      const {
        firstname,
        lastname,
        username,
        email,
        password,
        age,
        sex,
        country,
        phoneNumber,
      } = req.body;
      const { filename } = req.file;
      const newuser = new userSchema({
        firstname,
        lastname,
        username: !username ? firstname + lastname : username,
        email,
        password: await bcryptFunction.hashing(password),
        age,
        sex,
        role: "admin",
        country,
        phoneNumber,
        image: filename,
      });
      const userRegistered = await newuser.save();
      res.status(SERVER_DATA_CREATED_HTTP_CODE).json(userRegistered);
    } catch (err) {
      res.status(SERVER_BAD_REQUEST_HTTP_CODE).send(err.message);
    }
  },
  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      // console.log(email);
      const User = await adminQuery.getMgBySomething(
        userSchema,
        "email",
        email
      );
      // console.log(User);
      if (!User || User.role !== "admin")
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("Admin not found");
      const checkPassword = await bcryptFunction.compareHashingPass(
        password,
        User.password
      );
      if (!checkPassword)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("Your email or password incorrect");
      const token = await tokenFunction.generateToken({
        username: User.username,
        email: User.email,
        id: User._id,
        role: User.role,
      });
      res.cookie("tokenLogin", token);
      res
        .status(SERVER_OK_HTTP_CODE)
        .json({ message: "admin logged in succes", token: token });
    } catch (err) {
      return res
        .status(SERVER_UNAUTHORIZED_HTTP_CODE)
        .json({ messageError: err.message });
    }
  },
};

exports.manageUsers = {
  async getAllUsers(req, res) {
    try {
      const users = adminQuery.getMgAll(userSchema);
      if (!users)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("Users not found");
      return res.status(SERVER_OK_HTTP_CODE).json(users);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: NO_USER_FOUND, error: err });
    }
  },
  async getUsersById(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const user = await adminQuery.getMgBySomething(userSchema, "_id", id);
      if (!user)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("User not found");
      return res.status(SERVER_OK_HTTP_CODE).json(user);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: NO_USER_FOUND, error: err });
    }
  },
  async updateUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await adminQuery.getMgBySomthingAndUpdate(
        userSchema,
        "_id",
        id,
        req.body
      );
      if (!user)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send(USER_NOT_FOUND);
      if (user.role === "admin") {
        return res.status(SERVER_UNAUTHORIZED_HTTP_CODE).send(ACCESS_DENIED);
      }
      return res.status(SERVER_OK_HTTP_CODE).json(user);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: NO_USER_FOUND, error: err });
    }
  },
  async delUsersById(req, res) {
    try {
      const { id } = req.params;
      const user = await adminQuery.deleteMgBySomthing(userSchema, "_id", id);
      if (!user)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("User not found");
      return res.status(SERVER_OK_HTTP_CODE).json(user);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: NO_USER_FOUND, error: err });
    }
  },
};

exports.managePosts = {
  async addPost(req, res) {
    try {
      const { content } = req.body;
      const { filename } = req.files;
      const newPost = new postSchema({
        content,
        images: filename,
      });
      const postRegistered = await newPost.save();
      res.status(SERVER_DATA_CREATED_HTTP_CODE).json(postRegistered);
    } catch (err) {
      res.status(SERVER_BAD_REQUEST_HTTP_CODE).send(err.message);
    }
  },
  async getAllPost(req, res) {
    try {
      const posts = await getMgAll(postSchema);
      if (!posts)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("No posts found");
      return res.status(SERVER_OK_HTTP_CODE).json(posts);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POSTS_FOUND", error: err });
    }
  },
  async getAllPostNotVerified(req, res) {
    try {
      const posts = await adminQuery.getMgAll(postSchema);
      if (!posts)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("No posts found");
      const postsNv = posts.map((el) => !el.isVerified);
      if (!postsNv)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("All posts verified");
      return res.status(SERVER_OK_HTTP_CODE).json(postsNv);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POSTS_FOUND_NOT_VERIFIED", error: err });
    }
  },

  async verifiedPost(req, res) {
    try {
      const { id } = req.params;
      const post = await getMgBySomething(postSchema, "_id", id);
      if (!post || post.isVerified)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("No posts found ro verified");
      const vPost = await getMgBySomthingAndUpdate(postSchema, "_id", id, {
        isVerified: true,
      });
      if (!vPost)
        return res
          .status(SERVER_BAD_REQUEST_HTTP_CODE)
          .send("Post not verified");
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POST_FOUND", error: err });
    }
  },

  async unverifiedPost(req, res) {
    try {
      const { id } = req.params;
      const post = await getMgBySomething(postSchema, "_id", id);
      if (!post || !post.isVerified)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("No posts found or unverified");
      const vPost = await getMgBySomthingAndUpdate(postSchema, "_id", id, {
        isVerified: false,
      });
      if (!vPost)
        return res
          .status(SERVER_BAD_REQUEST_HTTP_CODE)
          .send("Post not unverified");
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POST_FOUND", error: err });
    }
  },

  async getAllPostVerified(req, res) {
    try {
      const posts = await adminQuery.getMgAll(postSchema);
      if (!posts)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("No posts found");
      const postsNv = posts.map((el) => el.isVerified);
      if (!postsNv)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("All posts not verified");
      return res.status(SERVER_OK_HTTP_CODE).json(postsNv);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POSTS_FOUND_VERIFIED", error: err });
    }
  },

  async updatePostById(req, res) {
    try {
      const { id } = req.params;
      const post = await adminQuery.getMgBySomthingAndUpdate(
        postSchema,
        "_id",
        id,
        req.body
      );
      if (!post)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("POST_NOT_FOUND");
      return res.status(SERVER_OK_HTTP_CODE).json(post);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POST_FOUND", error: err });
    }
  },

  async delPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await adminQuery.deleteMgBySomthing(postSchema, "_id", id);
      if (!post)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("Post not found");
      return res.status(SERVER_OK_HTTP_CODE).json(post);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_POST_FOUND", error: err });
    }
  },
};

exports.manageHotels = {
  async addHotel(req, res) {
    try {
      const {
        name,
        description,
        city,
        location,
        address,
        classification,
        menu,
        priceRange,
        openHour,
        closeHour,
        website,
        features,
      } = req.body;
      const { filename } = req.files;
      const newHotel = new hotelSchema({
        name,
        description,
        city,
        location,
        address,
        classification,
        menu,
        priceRange,
        openHour,
        closeHour,
        website,
        features,
        images: filename,
      });
      const hotelRegistered = await newHotel.save();
      res.status(SERVER_DATA_CREATED_HTTP_CODE).json(hotelRegistered);
    } catch (err) {
      res.status(SERVER_BAD_REQUEST_HTTP_CODE).send(err.message);
    }
  },
  async getAllHotel(req, res) {
    try {
      const hotels = await getMgAll(hotelSchema);
      if (!hotels)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("No hotels found");
      return res.status(SERVER_OK_HTTP_CODE).json(hotels);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_HOTELS_FOUND", error: err });
    }
  },
  async getHotelById(req, res) {
    try {
      const { id } = req.params;
      const hotel = await getMgBySomething(hotelSchema, "_id", id);
      if (!hotel)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("No hotel found");
      return res.status(SERVER_OK_HTTP_CODE).json(hotel);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_HOTELS_FOUND", error: err });
    }
  },
  async updateHotelById(req, res) {
    try {
      const { id } = req.params;
      const hotel = await adminQuery.getMgBySomthingAndUpdate(
        hotelSchema,
        "_id",
        id,
        req.body
      );
      if (!hotel)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("HOTEL_NOT_FOUND");
      return res.status(SERVER_OK_HTTP_CODE).json(hotel);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_HOTEL_FOUND", error: err });
    }
  },
  async delHotelById(req, res) {
    try {
      const { id } = req.params;
      const hotel = await adminQuery.deleteMgBySomthing(hotelSchema, "_id", id);
      if (!hotel)
        return res.status(SERVER_NOT_FOUND_HTTP_CODE).send("Hotel not found");
      return res.status(SERVER_OK_HTTP_CODE).json(hotel);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_HOTEL_FOUND", error: err });
    }
  },
};

exports.manageRestaurants = {
  async addRestaurant(req, res) {
    try {
      const {
        name,
        description,
        city,
        location,
        address,
        categories,
        classification,
        menu,
        priceRange,
        openHour,
        closeHour,
        website,
        features,
      } = req.body;
      const { filename } = req.files;
      const newRestaurant = new restaurantSchema({
        name,
        description,
        city,
        location,
        address,
        categories,
        classification,
        menu,
        priceRange,
        openHour,
        closeHour,
        website,
        features,
        images: filename,
      });
      const restaurantRegistered = await newRestaurant.save();
      res.status(SERVER_DATA_CREATED_HTTP_CODE).json(restaurantRegistered);
    } catch (err) {
      res.status(SERVER_BAD_REQUEST_HTTP_CODE).send(err.message);
    }
  },
  async getAllRestaurant(req, res) {
    try {
      const restaurants = await getMgAll(restaurantSchema);
      if (!restaurants)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("No restaurants found");
      return res.status(SERVER_OK_HTTP_CODE).json(restaurants);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_restaurantS_FOUND", error: err });
    }
  },
  async getRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await getMgBySomething(restaurantSchema, "_id", id);
      if (!restaurant)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("No restaurant found");
      return res.status(SERVER_OK_HTTP_CODE).json(restaurant);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_restaurantS_FOUND", error: err });
    }
  },
  async updateRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await adminQuery.getMgBySomthingAndUpdate(
        restaurantSchema,
        "_id",
        id,
        req.body
      );
      if (!restaurant)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("restaurant_NOT_FOUND");
      return res.status(SERVER_OK_HTTP_CODE).json(restaurant);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_restaurant_FOUND", error: err });
    }
  },
  async delRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await adminQuery.deleteMgBySomthing(
        restaurantSchema,
        "_id",
        id
      );
      if (!restaurant)
        return res
          .status(SERVER_NOT_FOUND_HTTP_CODE)
          .send("restaurant not found");
      return res.status(SERVER_OK_HTTP_CODE).json(restaurant);
    } catch (err) {
      res
        .status(SERVER_NOT_FOUND_HTTP_CODE)
        .json({ message: "NO_restaurant_FOUND", error: err });
    }
  },
};
