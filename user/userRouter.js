const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");

const Users = require("./users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

router.get("/", restricted, async (req, res) => {
  const newUser = await Users.find();
  try {
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

//function restricted(req, res, next) {
//const { username, password } = req.headers;

//if (username && password) {
//Users.findBy({ username })
//.first()
//.then(user => {
//// check tha password guess against the database
//if (user && bcrypt.compareSync(password, user.password)) {
//next();
//} else {
//res.status(401).json({ message: 'You shall not pass!!' });
//}
//})
//.catch(error => {
//res.status(500).json(error);
//});
//} else {
//res.status(401).json({ message: 'Please provide credentials' });
//}
//}

async function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    const foundUser = await Users.findBy({ username }).first();
    try {
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        next();
      } else {
        res.status(401).json({ message: `You shall not pass!` });
      }
    } catch (err) {
      res.status(500).json({ message: `Internal Error, ${err}` });
    }
  }
}

module.exports = router;
