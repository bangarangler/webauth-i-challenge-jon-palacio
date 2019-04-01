exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    { username: "Jon", password: "qwerty" },
    { username: "Bob", password: "wasd" },
    { username: "Margot", password: "pass" },
    { username: "Kelly", password: "anotherpass" }
  ]);
};
