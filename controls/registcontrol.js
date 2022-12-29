const cookie_creation = require("./cookie_creation");
const user = require("../db/user");
const cart = require("../db/cart");
const registerpage = (req, res) => {
  res.render("registration");
};

const registeruser = async (req, res) => {
  try {
    var new_user = user(req.body);
    var data1 = user.find({ email: req.body.emaail });
    if (data1) {
      throw new Error("user already exist");
    }

    var data = await new_user.save();
    console.log(data);

    await cookie_creation(req, res, data._id);
    newcart = cart({
      cid: data.id,
      product: [],
    });
    await newcart.save();
    res.send({
      sucess: true,
      message: "insertion  and cart done successfully",
      url: "/",
    });
  } catch (err) {
    res.send({
      sucess: false,
      messae: `${err.message}`,
      url: "/error",
    });
  }
};
module.exports = {
  registerpage,
  registeruser,
};
