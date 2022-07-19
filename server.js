const fs = require("fs");

const path = require("path");

const express = require("express");

const notes = require("./db/db.json");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

function createNewNote(body, noteArry) {
  const note = body;
  noteArry.noteArry.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: noteArry }, null, 2)
  );
  return note;
}

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  let note = {
    title: req.body.title,
    text: req.body.text,
    id: notes.noteArry.length,
  };
  createNewNote(note, notes);
});

console.log(notes);
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
