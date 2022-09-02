const apiRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

apiRouter.get("/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

apiRouter.post("/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

apiRouter.delete("/notes/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.status(200).end();
    });
});

module.exports = apiRouter;
