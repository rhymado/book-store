const db = require("../config/db");
const books = [
  {
    id: 1,
    title: "Harry Potter",
    author: "JK Rowling",
  },
  {
    id: 2,
    title: "Naruto",
    author: "Masashi Kishimoto",
  },
  {
    id: 3,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
  },
];

const getBooksFromServer = () => {
  return new Promise((resolve, reject) => {
    // let err = false;
    // if (err)
    //   return reject({
    //     err: new Error(err),
    //     status: 500,
    //   });
    // return resolve(books);
    db.query("SELECT * FROM books")
      .then((result) => {
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getSingleBookFromServer = (id) => {
  return new Promise((resolve, reject) => {
    let err = false;
    const book = books.filter((book) => book.id === id);
    if (err)
      return reject({
        err: new Error(err),
        status: 500,
      });
    if (book.length === 0)
      return reject({
        err: new Error("Book Not Found"),
        status: 404,
      });
    return resolve(book);
  });
};

module.exports = {
  getBooksFromServer,
  getSingleBookFromServer,
};
