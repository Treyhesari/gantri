"use strict";
const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb://localhost:27017/gantri",
  (error) => {
    if (!error) {
      console.log("Success");
    } else {
      console.log(`Error connectong to database with error ${error}.`);
    }
  }
);

module.exports = connection;

const User = require("./users.model");
