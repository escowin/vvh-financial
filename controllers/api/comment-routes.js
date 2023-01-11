const router = require("express").Router();
const { Comment, Client } = require("../../models");
const withAuth = require('../../utils/auth');

// authguarded | crud operations accessible only to logged in user
// restful api | comments | /api/comments/
// - read
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - create | accessible only to session user
router.post("/", (req, res) => {
  // only logged in users can comment on posts as the user id is tied to the corresponding session user id
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      client_id: req.body.client_id,
      user_id: req.body.user_id
      // user_id: req.session.user_id
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// - update
router.put("/:id", (req, res) => {
  Comment.update(
    {
      user_id: req.body.user_id,
      comment_text: req.body.comment_text,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        req.status(404).json({ message: "comment does not exist" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - delete
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "comment does not exist" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
