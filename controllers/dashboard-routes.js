const router = require("express").Router();
const { Client, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get | dashboard | /dashboard/ | accessible only to session user
router.get("/", withAuth, (req, res) => {
  Client.findAll({
    where: { user_id: req.session.user_id },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "contact_method",
      "client_text",
      "created_at",
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
      "created_at",
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
      }
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

module.exports = router;
