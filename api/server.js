require("dotenv").config();
const express = require("express");
const knex = require("knex");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const registerRouter = require("../register/registerRouter.js");
const loginRouter = require("../login/loginRouter.js");
const userRouter = require("../user/userRouter.js");
const sessionConfig = require("../auth/session-config.js");

const db = require("../data/dbConfig.js");

const server = express();

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/users", userRouter);

server.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "IT'S WORKING!" });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = server;
