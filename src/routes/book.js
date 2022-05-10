const express = require("express");

const Router = express.Router();

const bookController = require("../controllers/book");
const validate = require("../middlewares/validate");
const { checkToken } = require("../middlewares/auth");

// mendapatkan list buku
Router.get("/all", bookController.getAllBooks);
// mendapatkan buku dengan id 1
Router.get("/:id", bookController.getBookById);
// melakukan pencarian buku
Router.get("/", validate.queryFind, bookController.findBookByQuery);
// memasukkan buku baru
Router.post("/", checkToken, validate.bookData, bookController.postNewBook);

module.exports = Router;
