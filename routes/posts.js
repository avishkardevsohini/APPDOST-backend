const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for image upload


// Create post
router.post('/', auth, async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length < 1) {
    return res.status(400).json({ message: 'Post text is required.' });
  }
  try {
    const post = new Post({
      user: req.user.id,
      text,
      image: ''
    });
    await post.save();
    await post.populate('user', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').populate('comments.user', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Comment on post
router.post('/comment/:id', auth, async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = { user: req.user.id, text };
    post.comments.push(comment);
    await post.save();
    await post.populate('comments.user', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit post
router.put('/:id', auth, async (req, res) => {
  const { text } = req.body;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    post.text = text;
    await post.save();
    await post.populate('user', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

  await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;