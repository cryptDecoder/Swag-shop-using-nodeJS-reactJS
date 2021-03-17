/***
 * @action Create the server
 * @route http://localhost:8080/
 * @method GET
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://localhost:27017/swag-shop");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
