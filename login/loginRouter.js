const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const Users = require("../user/users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

router.post("/", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json(`Bad request, must have username and password`);
  } else {
    try {
      let selected = await Users.findBy({ username }).first();
      if (selected && bcrypt.compareSync(password, selected.password)) {
        req.session.selected = selected;
        console.log(req.session);
        res.status(200).json({ message: `Welcome ${selected.username}` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: `Internal Error, ${err}` });
    }
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: `unable to logout` });
      } else {
        res.status(200).json({ message: "Thanks for visiting!" });
      }
    });
  } else {
    res.status(200).json({ message: "bye, thanks for visiting" });
  }
});

module.exports = router;
