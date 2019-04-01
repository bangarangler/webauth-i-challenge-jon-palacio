const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const Users = require("../user/users-model.js");

//const register = require('./registers-model.js')

const db = knex(knexConfig.development);
const router = express.Router();

router.post("/", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 4);
  user.password = hash;
  const newUser = await Users.add(user);
  try {
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
