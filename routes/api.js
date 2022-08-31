const apiRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileaSync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const randomID = function () {
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

apiRouter.get("/notes", function (req, res) {
  readFileaSync("./db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

apiRouter.post("/notes", function (req, res) {
  const note = req.body;
  readFileaSync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      notes.id = randomID();
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

apiRouter.delete("/notes/:id", function (req, res) {
  const noteID = parseInt(req.params.id);
  readFileaSync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const notesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (noteID !== notes[i].id) {
          notesData.push(notes[i]);
        }
      }
      return notesData;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
    });
});

module.exports = apiRouter;
