const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");

const Users = require("./users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

router.get("/", restricted, async (req, res) => {
  try {
    const newUser = await Users.find();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

async function restricted(req, res, next) {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "Unathorized to See this... step off" });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err} ` });
  }
}
//const { username, password } = req.headers;
//if (username && password) {
//const foundUser = await Users.findBy({ username }).first();
////console.log(foundUser);
//try {
//if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
//next();
//} else {
//console.log("err here!!!");
//res.status(401).json({ message: `You shall not pass!` });
//}
//} catch (err) {
//res.status(500).json({ message: `Internal Error, ${err}` });
//}
//} else {
//res.status(400).json({ message: `Bad request, missing info` });
//}
//}

module.exports = router;
