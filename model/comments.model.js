const mongoose = require("mongoose");
const { serializeInteger } = require("whatwg-url");

var commentsSchema = new mongoose.Schema({
  name: {
    type: String,
    //this ensures that if there is no userid, then we need to have a name.
    required: function () {
      return !this.userId;
    },
    //required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: false,
  },
  artId: {
    type: Number,
    required: true,
  },
});

let Comment = mongoose.model("Comment", commentsSchema);
