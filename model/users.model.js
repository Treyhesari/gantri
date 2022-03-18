const mongoose = require("mongoose");
const { serializeInteger } = require("whatwg-url");

var usersSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

let User = mongoose.model("User", usersSchema);
