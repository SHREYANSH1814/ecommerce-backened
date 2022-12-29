const express = require("express");
const router = express.Router();
const product = require("../db/product");
const n = 10;
router.route("/product");
router.get("/list/:page", async (req, res) => {
  var page = req.params.page;
  var category = req.query.category;
  var s = n * (page - 1);
  try {
    var data;
    if (category) {
      data = await product.find({ pcategory: category }).limit(n).skip(s);
    } else {
      data = await product.find().limit(n).skip(s);
    }
    res.json({ success: true, data });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }
});
router.get('/:id',async (req,res)=>{
     var page = req.params.id;
     try {
    var data;
   
      data = await product.find({_id:id}).limit(n).skip(s);
    
    res.json({ success: true, data });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }

})
module.exports=router;
