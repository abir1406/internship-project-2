const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username avatar bio');

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, coverImage, tags } = req.body;

    const post = new Post({
      title, content, category, coverImage, tags,
      author: req.user.id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own posts' });
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

