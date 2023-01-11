const router = require("express").Router();
const { Client, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// restful api | routes | /api/users, /api/users/:id
// - create
router.post("/", (req, res) => {
  Client.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    contact_method: req.body.contact_method,
    client_text: req.body.client_text,
  })
    .then((dbClientData) => res.json(dbClientData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - read
router.get("/", withAuth, (req, res) => {
  Client.findAll({
    // order: [["created_at", "DESC"]],
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
    .then((dbClientData) => res.json(dbClientData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", withAuth, (req, res) => {
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
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "client_id",
          "user_id",
          "updated_at",
        ],
        // including the user model allows the username to be attached to the comment
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbClientData) => {
      if (!dbClientData) {
        res.status(404).json({ message: "client does not exist" });
        return;
      }
      res.json(dbClientData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - update
router.put("/:id", withAuth, (req, res) => {
  Client.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      contact_method: req.body.contact_method,
      // client_text: req.body.client_text,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbClientData) => {
      if (!dbClientData) {
        req.status(404).json({ message: "client does not exist" });
        return;
      }
      res.json(dbClientData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - delete
router.delete("/:id", withAuth, (req, res) => {
  Client.destroy({
    where: { id: req.params.id },
  })
    .then((dbClientData) => {
      if (!dbClientData) {
        res.status(404).json({ message: "client does not exist" });
        return;
      }
      res.json(dbClientData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
