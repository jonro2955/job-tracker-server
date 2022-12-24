var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes");

var app = express();
// Limit change required to send bytea files
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use("/", indexRouter);

module.exports = app;
