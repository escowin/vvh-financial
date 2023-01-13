const router = require("express").Router();
const { Client, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get | dashboard | /dashboard/ | accessible only to session user

// ** paused here **
router.get("/", withAuth, (req, res) => {
  Client.findAll({
    // where: { user_id: req.session.user_id },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "contact_method",
      "client_text",
    ],
    order: [["last_name", "ASC"]],
  })
    .then((dbClientData) => {
      // serializes data before passing to template
      const clients = dbClientData.map((client) => client.get({ plain: true }));
      res.render("dashboard", {
        clients,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Client.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "contact_method",
      "client_text",
      // "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "client_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbClientData) => {
      if (!dbClientData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      // serializes data
      const client = dbClientData.get({ plain: true });

      res.render("edit-client", {
        client,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/profile", withAuth, (req, res) => {
  User.findOne({
    attributes: { id: req.params.id },
    attributes: ["id", "username", "email", "password"],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render("profile", {
        user,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
