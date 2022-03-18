"use strict";
const express = require("express");
const connection = require("./model");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");

const UsersController = require("./controllers/users");
const ArtController = require("./controllers/art");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//the following routes will work with the router objects that we export in th controllers/art.js and controllers/users.js files.
app.use("/api/users", UsersController);

app.use("/api/art", ArtController);
//Normally, we would want to set this as a NODE_ENV parameter
app.listen("3000", () => {
  console.log("The Node.js server is up");
});
