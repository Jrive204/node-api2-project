const express = require("express");
const data = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  data
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The posts information could not be retrieved" })
    );
});
router.get("/:id", (req, res) => {
  const { id } = req.params;

  data
    .findById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not exist."
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The posts information could not be retrieved" })
    );
});
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  data
    .findCommentById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not exist."
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The posts information could not be retrieved" })
    );
});

// POSTS ----------

router.post("/", (req, res) => {
  const post = req.body;

  data
    .insert(post)
    .then(posts =>
      !post.title || !post.content
        ? res
            .status(400)
            .json({
              errorMessage: "Please provide title and contents for the post"
            })
        : res.status(201).json(posts)
    )
    .catch(err =>
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      })
    );
});

module.exports = router;
