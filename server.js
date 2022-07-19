const fs = require("fs");

const path = require("path");

const express = require("express");

const notes = require("./db/db.json");

const PORT = process.env.PORT || 3000;

const app = express();

// app.get('/api/notes', (req, res) => {
//     let results = notes;
//     res.json(results);
//   });

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


console.log(notes);
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
