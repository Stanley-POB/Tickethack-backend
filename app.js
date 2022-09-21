var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var cartRouter = require("./routes/cart");
// var bookingRouter = require("./routes/booking");

var app = express();
const cors = require("cors");
var moment = require("moment"); // require
moment().format();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/cart", cartRouter);
// app.use("/booking", bookingRouter);

module.exports = app;
