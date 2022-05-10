const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { register, getPassByUserEmail } = require("../models/auth");
const { successResponse, errorResponse } = require("../helpers/response");

const auth = {};

auth.register = (req, res) => {
  // expect sebuah body dengan
  // property email dan pass
  const {
    body: { email, pass },
  } = req;
  bcrypt
    .hash(pass, 10)
    .then((hashedPassword) => {
      register(email, hashedPassword)
        .then(() => {
          successResponse(res, 201, { msg: "Register Success" }, null);
        })
        .catch((error) => {
          const { status, err } = error;
          errorResponse(res, status, err);
        });
    })
    .catch((err) => {
      errorResponse(res, 500, err);
    });
};

auth.signIn = async (req, res) => {
  try {
    // mendapatkan body email dan pass
    const {
      body: { email, pass },
    } = req;
    // cek kecocokan email dan pass di db
    const data = await getPassByUserEmail(email);
    const result = await bcrypt.compare(pass, data.pass);
    if (!result)
      return errorResponse(res, 400, { msg: "Email or Password is wrong" });
    // generate jwt
    const payload = {
      id: data.id,
      email,
    };
    const jwtOptions = {
      issuer: process.env.JWT_ISSUER,
      expiresIn: "1000s", // expired in 1000s
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    // return
    successResponse(res, 200, { email, token }, null);
  } catch (error) {
    const { status, err } = error;
    errorResponse(res, status, err);
  }
};

module.exports = auth;
