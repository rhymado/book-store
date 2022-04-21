const Router = require("express").Router();

// specified HTTP Request
// definisikan endpoint
Router.get("/", (req, res) => {
  res.json({
    msg: "pong",
  });
});

module.exports = Router;
