const express = require("express");

const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
