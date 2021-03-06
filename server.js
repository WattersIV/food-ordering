// load .env data into process.env
const dotENV = require('dotenv');
dotENV.config({path: "./twilio.env"});
dotENV.config({path: "./.env"})


// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const bcrypt        = require("bcrypt");
const cookieSession = require("cookie-session")

app.use(cookieSession({
  name: "session",
  keys: ["topsecret", "tiptopsecret"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// PG database client/connection setup
const { Pool, Client } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
const databaseHelpers = require("./helpers/database_helpers")(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/order");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use('/', mainRoutes(db));
app.use("/admin", adminRoutes(databaseHelpers));
app.use("/order", orderRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


app.get("/test", (req, res) => {
  res.render("confirmation");
});

