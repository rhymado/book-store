const express = require("express");

const Router = express.Router();

const bookController = require("../controllers/book");

// mendapatkan list buku
Router.get("/all", bookController.getAllBooks);
// mendapatkan buku dengan id 1
Router.get("/1", bookController.getBookById);
// memasukkan buku baru
// Router.post("/", (req, res) => {
// });

module.exports = Router;
