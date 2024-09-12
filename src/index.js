const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_media_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Post model
const Post = mongoose.model('Post', new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
}));

// Create a post
app.post('/api/posts', async (req, res) => {
  const post = new Post({ content: req.body.content });
  await post.save();
  res.send(post);
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
