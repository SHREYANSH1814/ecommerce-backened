const jwt = require("jsonwebtoken");

const protected = (req, res, next) => {
  if (req.cookies.Shoplane) {
    const token = req.cookies.Shoplane;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      next();
    } else {
      res.send({
        success: false,
        message: "please logged yourself",
        url: "/login",
      });
    }
  } else {
    res.send({
      success: false,
      message: "please logged yourself",
      url: "/login",
    });
  }
};
module.exports = protected;
