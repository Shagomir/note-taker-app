const db = require("../db/db.json");
const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { updateIDs, deleteID } = require("../helpers/dbUtils");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

notes.get("/", (req, res) => {
  console.info(`${req.method} /api/notes`);
  readFromFile("./db/db.json").then((data) =>
    res.status(200).json(JSON.parse(data))
  );
});

notes.post("/", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} /api/notes`);

  // Destructuring assignment for the items in req.body
  console.log(req.body);
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: 0,
      title,
      text,
    };

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(newNote);
    readAndAppend(newNote, "./db/db.json")
    updateIDs("./db/db.json")
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

notes.delete("/:note_id", (req, res) => {
  // Log that a request was received
  console.info(`${req.method} /api/notes`);
  if (req.params.note_id) {
    const noteID = req.params.note_id;
    //deleteID returns true if the ID was deleted, false if it was not.
    const isDeleted = deleteID("./db/db.json", noteID);
    if (isDeleted) {
      console.info(`Deleting note with ID ${noteID}`);
      res.status(201).json(response);
    } else {
      res.status(404).send("note not found");
    }
  } else {
    res.status(400).send("note ID not provided");
  }
});

module.exports = notes;
