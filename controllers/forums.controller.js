const ForumPost = require('../models/schema/forum.schema');

// Create a new forum post
exports.createForumPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; 
    try {
      const newPost = await ForumPost.create({ title, content, user: userId });
      res.json({message:'new post created successufly',post: newPost});
    } catch (error) {
      res.json({ error: err.message});
    }
  };
  

// Get all forum posts
exports.getAllForumPosts = async (req, res) => {
  try {
    const forumPosts = await ForumPost.find();
    res.json({forums: forumPosts});
  } catch (error) {
    res.json({ error: err.message});
  }
};

// Get a single forum post by ID
exports.getForumPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.json({ error: err.message });
  }
};

// Update a forum post
exports.updateForumPost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedPost = await ForumPost.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.json({ message: 'Post not found' });
    }
    res.json({message: 'updated succuss', forum: updatedPost});
  } catch (error) {
    res.json({ error: err.message });
  }
};

// Delete a forum post
exports.deleteForumPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await ForumPost.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.json({ error: err.message});
  }
};
