// routes/posts.js
const express = require("express");
const multer = require("multer");
const Post = require("../models/schema/post.schema");
const User = require("../models/schema/user.schema");
const Comment = require("../models/schema/comment.schema");
//const authMiddleware = require("../middleware/auth");
const postRouter = express.Router();
const { upload } = require("../middleware/multer.middleware");

// Create a post
postRouter.post(
  "/",
  /*authMiddleware,*/ upload.single("file"),
  async (req, res) => {
    console.log("right one");
    const { text, author } = req.body;
    console.log(text);
    console.log(author);
    console.log(req.file);
    const image = req.file ? req.file.path : null;
    console.log(image);

    try {
      const post = new Post({
        author,
        image,
        content: text,
      });
      await post.save();
      res.json({ success: true, post });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Get all posts
postRouter.get("/", async (req, res) => {
  try {
    console.log("Fetching posts with author usernames...");
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "username", // Assuming 'username' is the field you want from the User collection
      })
      .populate({ path: "likes" })
      .populate({ path: "comments" });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a post
postRouter.put("/:id/like" /*, authMiddleware*/, async (req, res) => {
  try {
    console.log("here we go");
    const { id } = req.params;
    const { author } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    console.log(post.likes);
    if (post.likes.includes(author)) {
      post.likes.pull(author);
    } else {
      post.likes.push(author);
    }

    await post.save();
    console.log(post);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/*
// Report a post
postRouter.put("/:id/report", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Check if the user has already reported the post
    if (!post.reports.includes(req.user._id)) {
      // Add user ID to reports array
      post.reports.push(req.user._id);
      await post.save();
      return res.json({ message: "Post reported successfully", post });
    } else {
      // User has already reported the post
      return res.status(400).json({ error: "Post already reported" });
    }
  } catch (err) {
    // Error handling
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
*/
// Add a comment to a post
postRouter.post(
  "/:id/comment",
  /*authMiddleware,*/ async (req, res) => {
    const { content, userId } = req.body;
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });

      const comment = new Comment({
        user: userId,
        post: post._id,
        content,
      });
      await comment.save();

      post.comments.push(comment._id);
      await post.save();

      res.json(comment);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get comments for a post
postRouter.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "username")
      .exec();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/*
// Delete a post
postRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Post.deleteOne({ _id: post._id });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
*/
module.exports = postRouter;
