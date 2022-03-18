const { countReset } = require("console");
const { generatePrime } = require("crypto");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const UsersModel = mongoose.model("User");
const url = "mongodb://localhost:27017/gantri";
const collectionName = "users";
const startCount = 101;
var currentCount = -1;

//this funciton keeps track of the number of users and therefore we can create our own id for each user.
//There might be other methods of using incremented integers for the id that we could also use here.
//We could use a similar method to keep trakc of the ids for the comments as well. but for this assignemet I stuck with the
//mongodb generated _ids for comments.

function numberOfCounts(collectionName) {
  var count = 0;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mongoose.connect(url, (err, db) => {
        if (err) {
          reject(err);
        } else {
          db.collection(collectionName)
            .countDocuments()
            .then((numOfDcos) => {
              console.log(numOfDcos);
              //db.close();
              resolve(numOfDcos);
            });
        }
      });
    }, 2000);
  });
}

router.post("/", (req, res) => {
  numberOfCounts(collectionName).then((docCount) => {
    currentCount = docCount;
    var user = new UsersModel();
    user.id = currentCount + startCount;
    user.name = req.body.name;
    user.age = req.body.age;
    user.location = req.body.location;

    user.save((err, doc) => {
      if (!err) {
        res.send("User Create");
      } else {
        res.send(`Error Occured ${err}`);
      }
    });
  });
});

router.get("/", (req, res) => {
  UsersModel.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      res.send("Couldn't connect to Database");
    }
  });
});

module.exports = router;
