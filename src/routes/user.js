const Router = require("express").Router();

const { checkToken } = require("../middlewares/auth");
const imageUpload = require("../middlewares/upload");
const db = require("../config/db");
const { successResponse, errorResponse } = require("../helpers/response");

Router.patch("/", checkToken, imageUpload.single("photo"), (req, res) => {
  const id = req.userPayload.id;
  const { file = null } = req;
  const photo = file.path.replace("public", "").replace(/\\/g, "/");
  db.query("UPDATE users SET photo = $1 WHERE id = $2 RETURNING photo", [
    photo,
    id,
  ])
    .then((result) => {
      successResponse(res, 200, result.rows[0], null);
    })
    .catch((err) => {
      errorResponse(res, 500, err);
    });
});

module.exports = Router;
