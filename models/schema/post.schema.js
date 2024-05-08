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
    type: [String],
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
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Post", postSchema);
