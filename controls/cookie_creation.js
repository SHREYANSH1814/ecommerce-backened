const jwt = require("jsonwebtoken");

const cookie_creation = async (req, res, userId) => {
  const token = jwt.sign(
    { id: userId, type: "customer" },
    process.env.JWT_SECRET
  );
  var expirydate = new Date();
  var expirydate = expirydate.getTime() + 600000;
  console.log(expirydate);
  try {
    await res.cookie("Shoplane", token, {
      secure: false,
      httponly: false,
      maxAge: "60000",
    });
  } catch (err) {
    console.log(err);
  }
  console.log("cookie is created");
};
module.exports = cookie_creation;
