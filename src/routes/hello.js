const Router = require("express").Router();

// endpoint /hello
// method GET
Router.get("/", (req, res) => {
  res.json({
    msg: "morning",
  });
});

// endpoint /hello
// method POST
Router.post("/", (req, res) => {
  res.json({
    msg: "welcome",
  });
});
Router.patch("/", (req, res) => {
  res.json({
    msg: "patched welcome",
  });
});
Router.delete("/", (req, res) => {
  res.json({
    msg: "no welcome",
  });
});

module.exports = Router;
