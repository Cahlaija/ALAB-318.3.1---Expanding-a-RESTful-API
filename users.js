const express = require("express");
const router = express.Router();

const users = require("../data/users");
const posts = require("../data/posts");
const comments = require("../data/comments");

// GET /api/users/:id/posts
router.get("/:id/posts", (req, res) => {
  const userPosts = posts.filter(p => p.userId == req.params.id);
  res.json(userPosts);
});

// GET /api/users/:id/comments
router.get("/:id/comments", (req, res) => {
  let result = comments.filter(c => c.userId == req.params.id);

  const { postId } = req.query;

  if (postId) {
    result = result.filter(c => c.postId == postId);
  }

  res.json(result);
});

module.exports = router;
