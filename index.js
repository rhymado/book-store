require("dotenv").config();
const express = require("express");
const cors = require("cors");
// import package express
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");
// const mainRouter = require("./src/routes");
const logger = require("morgan");

// create express application
const server = express();
const PORT = 8080;

// jika db berhasil connect maka kita jalankan servernya
db.connect()
  .then(() => {
    console.log("DB Connected");
    // pasang middleware global
    // logger
    server.use(
      logger(":method :url :status :res[content-length] - :response-time ms")
    );
    // handler/middleware untuk body berbentuk form urlencoded
    server.use(express.urlencoded({ extended: false }));
    // handler/middleware untuk body berbentuk raw json
    server.use(express.json());

    // pasang cors
    const corsOptions = {
      origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    server.use(cors(corsOptions));
    // server.options("*", cors(corsOptions));

    server.use(express.static("public"));
    // pasang router ke server
    server.use(mainRouter);

    // run server at port
    server.listen(PORT, () => {
      console.log(`Server is Running at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
