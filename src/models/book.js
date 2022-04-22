const db = require("../config/db");

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
    // parameterized query
    const sqlQuery = "select * from books where id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "Book Not Found" });
        }
        const response = {
          data: data.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const findBook = (query) => {
  return new Promise((resolve, reject) => {
    // asumsikan query berisikan title, order, sort
    const { title, order, sort } = query;
    let sqlQuery =
      "select * from books where lower(title) like lower('%' || $1 || '%')";
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    db.query(sqlQuery, [title])
      .then((result) => {
        if (result.rows.length === 0) {
          return reject({ status: 404, err: "Book Not Found" });
        }
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

const createNewBook = (body) => {
  return new Promise((resolve, reject) => {
    const { title, author, genre } = body;
    const sqlQuery =
      "INSERT INTO books(title, author, genre) VALUES ($1, $2, $3) RETURNING *";
    db.query(sqlQuery, [title, author, genre])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

module.exports = {
  getBooksFromServer,
  getSingleBookFromServer,
  findBook,
  createNewBook,
};
