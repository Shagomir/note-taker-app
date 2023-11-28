const notes = require("express").Router();

const { deleteID } = require("../helpers/dbUtils");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// grab the notes from the DB
notes.get("/", (req, res) => {
  console.info(`${req.method} /api/notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
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
      id: 0,  //the ID will be set during the readAndAppend function
      title,
      text,
    };

    console.log(newNote);
    //add the newNote object to the notes db object
    readAndAppend(newNote, "./db/db.json");

    //create a response object and send it
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);

  } else {
    res.json("Error in posting note");
  }
});

notes.delete("/:note_id", (req, res) => {
  // Log that a request was received
  console.info(`${req.method} /api/notes`);
  //check that the request has a valid parameter
  if (req.params.note_id) {
    const noteID = req.params.note_id;
    //deleteID returns true if the ID was deleted, false if it was not.
    const isDeleted = deleteID(noteID);
    if (isDeleted) {
      //display message and response when ID is deleted properly. 
      console.info(`Deleting note with ID ${noteID}`);
      res.status(201);
    } else {
      //404 error if the ID is outside of the valid range
      res.status(404).send("note not found");
    }
  } else {
    //400 error here means no parameter supplied
    res.status(400).send("note ID not provided");
  }
});

module.exports = notes;
