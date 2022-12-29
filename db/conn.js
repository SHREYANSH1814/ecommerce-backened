const mongoose = require("mongoose");

const connect = async () => {
  try {
    let t = await mongoose.connect("mongodb://localhost/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ecommerce",
    });
    console.log("connection successfully");
  } catch (err) {
    console.log(err);
  }
};
var conn = () => {
  connect();
};
conn();

module.exports = mongoose;
