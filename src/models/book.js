const db = require("../config/db");

const getBooks = (query) => {
  return new Promise((resolve, reject) => {
    // let err = false;
    // if (err)
    //   return reject({
    //     err: new Error(err),
    //     status: 500,
    //   });
    // return resolve(books);
    const { page = 1, limit = 3 } = query;
    // page   1 2 3 4
    // offset 0 3 6 9
    // offset = (page - 1) * limit
    const offset = (parseInt(page) - 1) * Number(limit);

    db.query("SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2", [
      Number(limit),
      offset,
    ])
      .then((result) => {
        // ambil total data
        const response = {
          data: result.rows,
        };
        db.query("SELECT COUNT(*) AS total_book FROM books")
          .then((result) => {
            response.totalData = parseInt(result.rows[0]["total_book"]);
            response.totalPage = Math.ceil(
              response.totalData / parseInt(limit)
            );
            resolve(response);
          })
          .catch((err) => {
            reject({ status: 500, err });
          });
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
    const { title, author, genre, category } = body;
    const sqlQuery =
      "INSERT INTO books(title, author, genre, category_id) VALUES ($1, $2, $3, $4) RETURNING *";
    db.query(sqlQuery, [title, author, genre, category])
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
  getBooks,
  getSingleBookFromServer,
  findBook,
  createNewBook,
};
