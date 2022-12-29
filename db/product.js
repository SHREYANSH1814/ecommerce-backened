const mongoose = require("mongoose");
var url = "/default-product.png";
var productschema = new mongoose.Schema({
  pname: { type: String, required: true },
  pvendor: { type: String, required: true },
  pqty: String,
  pprice: String,
  pdprice: String,
  pcategory: String,
  pspecification: String,
  pimg: {
    type: String,
    default: url,
  },
  pdescription: String,
});

var product = mongoose.model(product, productschema);
module.exports=product;