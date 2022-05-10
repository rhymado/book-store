const express = require("express");

const Router = express.Router();

const pingRouter = require("./ping");
const helloRouter = require("./hello");
const bookRouter = require("./book");
const authRouter = require("./auth");
const userRouter = require("./user");

Router.use("/ping", pingRouter);
Router.use("/hello", helloRouter);
Router.use("/book", bookRouter);
Router.use("/auth", authRouter);
Router.use("/user", userRouter);

module.exports = Router;
