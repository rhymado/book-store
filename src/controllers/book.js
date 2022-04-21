const bookModel = require("../models/book");
const { getBooksFromServer, getSingleBookFromServer } = bookModel;

const getAllBooks = (_, res) => {
  getBooksFromServer()
    .then((result) => {
      const { total, data } = result;
      res.status(200).json({
        data,
        total,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        err,
        data: [],
      });
    });
};

const getBookById = (_, res) => {
  getSingleBookFromServer(1)
    .then((result) => {
      res.status(200).json({
        data: result,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        data: [],
        err: err.message,
      });
    });
};

// shorthand object
module.exports = {
  getAllBooks,
  getBookById,
};
