const { registerpage, registeruser } = require("../controls/registcontrol");
const express = require("express");
const registrouter = express.Router();
registrouter.route("/").get(registerpage).post(registeruser);
module.exports = registrouter;
