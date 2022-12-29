const path = require("path");
const cors = require("cors");
const pathenv = path.join(__dirname, "/.env");
require("dotenv").config({ path: pathenv });
const conn = require("./db/conn");
const express = require("express");
const cookieparser = require("cookie-parser");
const productrouter = require("./router/productrouter");
const cartrouter = require("./router/cart");
const app = express();
// routers
const registrouter = require("./router/registrouter");
const loginrouter = require("./router/loginrouter");
// midddleware
const protected = require("./controls/protected");
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(cookieparser());
app.use(express.json());
app.use(cors());
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.static("public"));
app.get("/", protected, (req, res) => {
  res.render("index");
});
app.use("/login", loginrouter);
app.use("/registration", registrouter);
app.use(productrouter);
app.use(cartrouter);

app.get("/payment", async (req, res) => {
  // const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Apple Iphone",
          },
          unit_amount: 1 * 100,
        },
        quantity: "1",
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8080/success",
    cancel_url: "http://localhost:8080/cancel",
  });
  res.json({ id: session.id });
});
app.get("/success", (req, res) => {
  res.json({ msg: "payment successfull" });
});
app.get("/cancel", (req, res) => {
  res.json({ msg: "payment not successful" });
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if (!err) console.log(`port is succesfully running on ${port}`);
});
