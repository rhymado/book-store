const bookModel = require("../models/book");
const { getBooks, getSingleBookFromServer, findBook, createNewBook } =
  bookModel;
const { successResponse, errorResponse } = require("../helpers/response");

const getAllBooks = (req, res) => {
  getBooks(req.query)
    .then((result) => {
      /**
       * meta = {
       *  next, totalpage, previous, totaldata
       * }
       */
      const { totalData, totalPage, data } = result;
      const meta = {
        totalData,
        totalPage,
        route: `/book${req.route.path}?`,
        query: req.query,
        page: req.query.page,
      };
      successResponse(res, 200, data, meta);
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

// di dalam object request,
// kita bisa mengirimkan input diantaranya melalui:
// 1. path params => req.params
// ex: localhost/book/:id
// { id: 1 }
// 2. query params => req.query
// ex: localhost/book?author=Andre
// 3. body => req.body
// - form-urlencoded
// - raw json

const getBookById = (req, res) => {
  const id = req.params.id;
  getSingleBookFromServer(id)
    .then(({ data }) => {
      // const { data } = result;
      res.status(200).json({
        data,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        data: [],
        err,
      });
    });
};

const findBookByQuery = (req, res) => {
  // localhost/book?title=harry&author=andre
  //  req.query
  //  {
  //    title: harry,
  //    author: andre
  //  }
  findBook(req.query)
    .then(({ data, total }) => {
      res.status(200).json({
        err: null,
        data,
        total,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        data: [],
        err,
      });
    });
};

const postNewBook = (req, res) => {
  createNewBook(req.body)
    .then(({ data }) => {
      res.status(200).json({
        err: null,
        data,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        err,
        data: [],
      });
    });
};

// shorthand object
module.exports = {
  getAllBooks,
  getBookById,
  findBookByQuery,
  postNewBook,
};
