const fs = require("fs");
const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const exphbs = require("express-handlebars");

const puerto = 8080;´
const app = express();
const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("{__dirname}/uploads"));
