const mongoose = require("mongoose");
const { serializeInteger } = require("whatwg-url");

var artSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const art = mongoose.model("art", artSchema);

module.exports = art;
