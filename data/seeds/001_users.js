const bcrypt = require("bcryptjs");
exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    { username: "Jon", password: bcrypt.hashSync("qwerty", 4) },
    { username: "Bob", password: bcrypt.hashSync("wasd", 4) },
    { username: "Margot", password: bcrypt.hashSync("pass", 4) },
    { username: "Kelly", password: bcrypt.hashSync("anotherpass", 4) }
  ]);
};
