/***
 * @action Create the server
 * @route http://localhost:8080/
 * @method GET
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./models/product");
var Wishlist = require("./models/wishlist");
const wishlist = require("./models/wishlist");

var db = mongoose.connect("mongodb://localhost:27017/swag-shop");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", (req, res) => {
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.likes = 0;
  product.save((err, savedProduct) => {
    if (err) {
      return res.status(500).send({ error: err });
    } else {
      return res.status(200).send(savedProduct);
    }
  });
});

//  get all product
app.get("/product", (req, res) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Update the data

app.post("/wishlist", (req, res) => {
  var wishlist = new Wishlist();
  wishlist.title = req.body.title;

  wishlist.save((err, newWishlist) => {
    if (err) {
      res.send(500).send(err);
    } else {
      res.send(newWishlist);
    }
  });
});

app.get("/wishlist", (req, res) => {
  Wishlist.find({})
    .populate({ path: "products", mode: "Product" })
    .exec((err, wishlist) => {
      if (err) {
        res.send(err);
      } else {
        res.send(wishlist);
      }
    });
});

app.put("/wishlist/product/add", (req, res) => {
  Product.findOne({ _id: req.body.ProductId }, (err, product) => {
    if (err) {
      res.send(err);
    } else {
      Wishlist.update(
        { _id: req.body.wishlistId },
        { $addToSet: { products: product._id } },
        (err, wishlist) => {
          if (err) {
            res.send(err);
          } else {
            res.send(wishlist);
          }
        }
      );
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
