const router = require("express").Router();
const { User, Client, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get | users | /api/users
router.get("/", withAuth, (req, res) => {
  // SELECT * FROM users;
  User.findAll({
    // reads user data aside from the password attribute
    attributes: { exclude: ["password", "email"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// restful api | specific user | /api/users/:id
// - read
router.get("/:id", withAuth, (req, res) => {
  // SELECT * FROM users WHERE id = ?;
  User.findOne({
    attributes: { exclude: ["password", "email"] },
    where: { id: req.params.id },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Client,
          attributes: ["first_name", "last_name", "phone", "email", "client_text"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - create
router.post("/", (req, res) => {
  // INSERT INTO users (username, email, password)
  // VALUES ('?', '?', '?');
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - update | accessible only to session user
router.put("/:id", withAuth, (req, res) => {
  // UPDATE users
  // SET username = '?', email='?', password='?'
  // WHERE id = ?;
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - delete | accessible only to session user
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      // res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// logging in & out | create & destroy sessions
router.post("/login", (req, res) => {
  // finds user via email query. if found, that query is passed as dbUserData.
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "invalid user or password" });
      return;
    }

    // verifies dbUserData's password by comparing the plain text with the object's stored hashed password.
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "invalid user or password" });
      return;
    }

    // accesses the session information
    req.session.save(() => {
      // declared session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "you are now logged in" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
