const psql = require("pg");
const { Pool } = psql;

const db = new Pool({
  user: "fakhri",
  host: "localhost",
  database: "fakhri",
  password: "t00r",
  port: 5432,
});

module.exports = db;
