const mongoose = require("mongoose");
const cartschema = mongoose.Schema({
  cid: String,
  product: Array,
});
const cart = mongoose.model("cart", cartschema);
module.export = cart;
