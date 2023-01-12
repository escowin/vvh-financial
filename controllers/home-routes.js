// mvc | view routes
const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Client, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

// rendering views
// - homepage template
router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

// - login template
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// - single client template
router.get('/client/:id', withAuth, (req, res) => {
  Client.findOne({
    where: { id: req.params.id },
    attributes: ["id", "first_name", "last_name", "email", "phone", "client_text"],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'client_id'],
        include: {
          model: User,
          attributes: ['username'],
        }
      }
    ]
  })
  .then(dbClientData => {
    if (!dbClientData) {
      res.status(404).json({ message: 'client does not exist' });
      return;
    }

    // serializes data
    const client = dbClientData.get({ plain: true });

    // passes data into template. can only be viewed as a logged in user
    res.render('single-client', {
      client,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;
