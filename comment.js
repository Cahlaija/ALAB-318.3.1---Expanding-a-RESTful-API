const express = require("express");
const router = express.Router();

let comments = [];

// GET all comments (with filters)
router.get("/", (req, res) => {
  const { userId, postId } = req.query;

  let result = comments;

  if (userId) {
    result = result.filter(c => c.userId == userId);
  }

  if (postId) {
    result = result.filter(c => c.postId == postId);
  }

  res.json(result);
});

// POST comment
router.post("/", (req, res) => {
  const newComment = {
    id: Date.now(),
    userId: req.body.userId,
    postId: req.body.postId,
    body: req.body.body,
  };

  comments.push(newComment);
  res.json(newComment);
});

// GET comment by id
router.get("/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.json(comment);
});

// PATCH comment
router.patch("/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  comment.body = req.body.body || comment.body;

  res.json(comment);
});

// DELETE comment
router.delete("/:id", (req, res) => {
  const index = comments.findIndex(c => c.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  comments.splice(index, 1);

  res.json({ message: "Comment deleted" });
});

module.exports = router;