const express = require("express");

const Router = express.Router();

const pingRouter = require("./ping");
const helloRouter = require("./hello");
const bookRouter = require("./book");

Router.use("/ping", pingRouter);
Router.use("/hello", helloRouter);
Router.use("/book", bookRouter);

// const word = "";

module.exports = Router;
