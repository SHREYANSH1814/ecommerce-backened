const express = require("express");
const cart = require("../db/cart");
const protected = require("../controls/protected");
const router = express.Router();
router.route("/cart");
router.get("/add/:id", protected, async (req, res) => {
  var pid = req.params.id;
  const token = req.cookies.Shoplane;
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  try {
    var data = await cart.update(
      { cid: verify.id },
      { $addToSet: { product: pid } }
    );

    res.send({ success: true, msg: "product added successfully" });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }
});
router.get("/cart", protected, async (req, res) => {
  const token = req.cookies.Shoplane;
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  try {
    var data = await cart.findMany({ cid: verify.id });

    res.send({ success: true, data: data });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }
});

router.get("remove/:id", async(req, res) => {
 const token = req.cookies.Shoplane;
 const verify = jwt.verify(token, process.env.JWT_SECRET);
 try {
    var data = await cart.UpdateOne({ cid: verify.id },{$pullAll: {
        product: req.params.id,
    },
});

    res.send({ success: true, msg:"item succccessfully deleted" });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }



});
module.exports=cart;