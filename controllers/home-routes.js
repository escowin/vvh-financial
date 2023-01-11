// mvc | view routes
const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Client, User, Comment } = require("../models");

// rendering views
// - homepage template
router.get("/", (req, res) => {
  console.log(req.session);

  res.render("homepage");
});

// - cta template
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


module.exports = router;
