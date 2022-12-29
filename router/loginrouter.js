const {
  loginpage,
  loginuser,
  emailpage,
  fpsmailgen,
} = require("../controls/logincontrol");
const express = require("express");
const loginrouter = express.Router();
loginrouter.route("/").get(loginpage).post(loginuser);
loginrouter.route("/forgetpassword").get(emailpage).post(fpsmailgen);

module.exports = loginrouter;
