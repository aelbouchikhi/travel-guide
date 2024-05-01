const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forums.controller');

// Create a new forum post
router.post('/', forumController.createForumPost);

// Get all forum posts
router.get('/', forumController.getAllForumPosts);

// Get a single forum post by ID
router.get('/:id', forumController.getForumPostById);

// Update a forum post
router.patch('/:id', forumController.updateForumPost);

// Delete a forum post
router.delete('/:id', forumController.deleteForumPost);

module.exports = router;
