const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const url = "mongodb://localhost:27017/gantri";
require("../model/users.model");
require("../model/comments.model");
const CommentsModel = mongoose.model("Comment");
const conct = require("../model/index");

cont.collection("collectionname").find;

const collectionName = "art";

//this function looks at the art collection and obtains only the desired values.
router.get("/", (req, res) => {
  mongoose.connect(url, (err, db) => {
    var array = [];
    var comments = [];
    if (err) {
      reject(err);
    } else {
      var docs = db
        .collection(collectionName)
        .find(
          {},
          //since the art has an id, the server omits the _id of the mongodb
          { projection: { id: 1, artist: 1, title: 1, year: 1, _id: 0 } }
        )
        .toArray(async (err, myArray) => {
          if (err) throw err;
          myArray.forEach(async (element) => {
            await obtainComments(element.id).then(async (response) => {
              element.commnets = response;
            });
          });
          //this wait is to ensure that all comments arrays have been returned from the
          await new Promise((r) => setTimeout(r, 2000));
          res.send(myArray);
        });
    }
  });
});
//:id allows us to enter any value here. We could do more work here to respond with HTTP Code 404 if the id doesn't exist. I did not implement that yet.
router.get("/:id", async (req, res) => {
  mongoose.connect(url, async (err, db) => {
    if (err) {
      reject(err);
    } else {
      var docs = db
        .collection(collectionName)
        .find(
          { id: Number(req.params.id) },
          { projection: { id: 1, artist: 1, title: 1, year: 1, _id: 0 } }
        )
        .toArray(async (err, doc) => {
          if (err) throw err;
          doc.forEach(async (element) => {
            //I obtain the comment through a promise. The code below for res.send doesn't wait for this await and executes
            //This is why I had to put the await new Promies with timeout below, otherwise the the response would be returned
            //without the comments
            await obtainComments(req.params.id).then(async (response) => {
              element.commnets = response;
            });
          });
          //this is to wait for the obtainComments function call set above to return. This is hacky
          await new Promise((r) => setTimeout(r, 200));
          res.send(doc);
        });
    }
  });
});
//this function ontains the comments array for each art
async function obtainComments(artId) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      var commnetsArray = [];
      mongoose.connect(url, (err, db) => {
        var comments = db
          .collection("comments")
          .find(
            { artId: Number(artId) },
            { projection: { name: 1, content: 1, userId: 1 } }
          )
          .toArray((err, comment) => {
            if (err) throw err;
            comment.forEach((element) => {
              commnetsArray.push({
                id: element._id,
                name: element.name,
                content: element.content,
                userID: element.userId,
              });
            });
          });
      });
      //whether a commentsArray has been generated or it was remained empty, it will get returned by the promise.
      resolve(commnetsArray);
    }, 0);
  });
}

router.post("/:id/comments", async (req, res) => {
  var repeatedName = false;
  var comment = new CommentsModel();
  comment.userId = req.body.userId;
  comment.name = req.body.name;
  comment.content = req.body.content;
  comment.artId = req.params.id;
  if (!req.body.userId) {
    await obtainComments(req.params.id)
      .then((response) => {
        for (let elem of response) {
          //response.forEach((elem) => {
          if (elem.name === req.body.name) {
            res.status(400);
            res.send(`A comment by this username already exists`);
            repeatedName = true;
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!repeatedName) {
    comment.save((err, doc) => {
      if (!err) {
        res.send("Comment Created");
      } else {
        //This is to indicate that and error occured during the creation of the comment.
        res.status(400);
        res.send(`Error Occured ${err}`);
      }
    });
  }
});

module.exports = router;
