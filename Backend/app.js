const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const app = express();

app.use(cors());

app.use(express.json());

const mongoDBURL = process.env.MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log("Received an Error");
  });

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

const Book = mongoose.model("books", bookSchema, "books");

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Unable to fetch books" });
  }
});

app.post("/books", async (req, res) => {
  const { title, author, description } = req.body;
  if (!title || !author || !description)
    return res.status(400).json({ error: "All fields are required" });

  const newBook = new Book({ title, author, description });
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error adding book" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting book" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`$Server running on port ${PORT}`));