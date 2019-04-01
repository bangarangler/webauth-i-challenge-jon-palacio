const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");

const users = require("./users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

module.exports = router;
