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
    .findPostComments(id)
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
      !post.title || !post.contents
        ? res.status(400).json({
            errorMessage: "Please provide title and contents for the post"
          })
        : Object.keys(req.body).length > 2
        ? res.status(500).json({
            errorMessage:
              "There was an error while saving the post to the database"
          })
        : res.status(201).json(posts)
    )
    .catch(err =>
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      })
    );
});
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const comment = { ...req.body, post_id: id };

  data
    .findCommentById(id)
    .then(ids =>
      ids.length === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        : data
            .insertComment(comment)
            .then(comments =>
              console.log(req.body, "comments") & !req.params
                ? res.status(404).json({
                    message: "The post with the specified ID does not exist."
                  })
                : !comment.text
                ? res.status(400).json({
                    errorMessage:
                      "Please provide title and contents for the post"
                  })
                : Object.keys(req.body).length > 2
                ? res.status(500).json({
                    errorMessage:
                      "There was an error while saving the post to the database"
                  })
                : res.status(201).json(comments) &
                  console.log(comment, "comments!")
            )
            .catch(
              err =>
                console.log(err, "comments") &
                res.status(500).json({
                  errorMessage:
                    "There was an error while saving the post to the database"
                })
            )
    )
    .catch();
});

// Delete -------------------------

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  data
    .remove(id)
    .then(posts =>
      posts === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        : res.status(200).json(posts) & console.log(posts, "posts")
    )
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The posts information could not be retrieved" })
    );
});
// PUT ----------------------------------------

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;

  data
    .update(id, post)
    .then(posts =>
      posts === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        : !post.title || !post.contents
        ? res.status(400).json({
            errorMessage: "Please provide title and contents for the post"
          })
        : Object.keys(req.body).length > 2
        ? res.status(500).json({
            errorMessage: "it Works"
          })
        : res.status(200).json(posts)
    )
    .catch(
      err =>
        res
          .status(500)

          .json({
            errorMessage: "The post information could not be modified"
          }) & console.log(Object.keys(req.body).length > 2, "reqbody")
    );
});

module.exports = router;
