const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const Users = require("../user/users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

router.post("/", async (req, res) => {
  let { username, password } = req.body;
  const selected = await Users.findBy({ username }).first();
  try {
    if (selected && bcrypt.compareSync(password, selected.password)) {
      res.status(200).json({ message: `Welcome ${selected.username}` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
