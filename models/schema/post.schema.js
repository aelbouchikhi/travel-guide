const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: {
      url: {
        type: String,
        required: false, 
      },
      publicId: {
        type: String, 
        required: false,
      },
    },
    required: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  keywords: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("Post", postSchema);
