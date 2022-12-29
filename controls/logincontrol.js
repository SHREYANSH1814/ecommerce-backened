const crypto = require("crypto");
const cookie_creation = require("./cookie_creation");
const user = require("../db/user");
const e = require("express");
const loginpage = (req, res) => {
  res.render("login");
};
const loginuser = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var data = await user.findOne({
    $and: [{ email: email }, { password: password }],
  });
  if (data) {
    console.log(data);
    cookie_creation(req, res, data._id);
    res.send({ success: true, message: "successfully logged in", url: "/" });
  } else {
    res.send({ success: false, message: "invalid credentials", url: "/" });
  }
};
const emailpage = (req, res) => {
  res.render("emailpage.ejs");
};

var main = require("./mailcontrol");
const fpsmailgen = async (req, res) => {
  var token = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(req.body.email)
    .digest("hex");
  console.log(token);

  //   send url localhost:8080/user/token on registerd mail via nodemailer
  try {
    var data = await user.updateOne(
      { email: req.body.email },
      { $set: { resettoken: token, time_limit: Date.now() + 5 * 60 * 1000 } }
    );
    console.log(data);

    if (data) {
      console.log("token inserted suuccesfully");
    }

    var link = `localhost:8080/user/${token}`;
    console.log(link);

    var data = await user.findOne({ email: req.body.email });
    console.log(data);
    await main(
      data.email,
      "recovery for password of instagram account ",
      `here is the link`,
      `<p>hi ${data.name} ,</p>
      <p>there was a request to change your password !</p>
      <p>If you did not make this request then please ignore this email</p>
      <p>otherwise .please click this link to change your account &nbsp;</p>
      <h1>${link}</h1>
      <h4>this link will be expired in 5 minutes</h4>

      `
    );
    console.log("mail sent successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loginpage,
  loginuser,
  fpsmailgen,
  emailpage,
};
