const apiRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

apiRouter.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db.json").then((data) => res.json(JSON.parse(data)));
});

apiRouter.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = apiRouter;
