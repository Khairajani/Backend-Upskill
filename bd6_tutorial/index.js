// import express from "express";
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let { getBooks, getBook, addBook } = require("./book.js");
let {
  getAllReviews,
  getReviewByID,
  addReview,
  getUserByID,
  addUser,
} = require("./review.js");

app.get("/", (req, res) => {
  res.send("Hello World! BD6 Tutorial");
});

// ======================= Tutorial: BD6.1 =======================
app.get("/api/books", (req, res) => {
  try {
    const books = getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res.status(200).json(books);
  } catch (err) {
    // return res.status(500).json({ error: err.message });
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/books/:id", (req, res) => {
  try {
    const book = getBook(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ error: "The book with the given ID was not found." });
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/app/books/new", (req, res) => {
  const book = addBook(req.body);
  res.status(201).json(book);
});

// ======================= Tutorial: BD6.2 =======================

app.get("/api/authors", (req, res) => {
  res.json(getAuthors());
});

app.get("/api/authors/:id", (req, res) => {
  const author = getAuthor(req.params.id);
  if (!author)
    return res.status(404).send("The author with the given ID was not found.");
  res.json(author);
});

app.post("/app/authors/new", (req, res) => {
  let authorId = req.query.authorId;
  let name = req.query.name;
  let book = req.query.book;
  let addedAuthor = addAuthor({ authorId, name, book });
  res.status(201).json(addedAuthor);
});

// ======================= Tutorial: BD6.3 =======================
// Review APIs

// 1. Fetch all reviews
app.get("/reviews", async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    if (allReviews.length === 0) {
      rer.status(404).json({ error: "No reviews found" });
    }
    return res.json(allReviews);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Fetch review by ID
app.get("/reviews/:id", async (req, res) => {
  try {
    const reviewID = parseInt(req.params.id);
    const review = await getReviewByID(reviewID);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 3. Add a new review
app.post("/reviews", async (req, res) => {
  const { content, userID } = req.body;
  if (!content || !userID) {
    return res
      .status(400)
      .json({ message: "Missing required fields: content, userID" });
  }
  const newReview = { content, userID };
  const addedReview = await addReview(newReview);
  res.status(201).json(addedReview);
});

// User APIs

// 1. Get user by ID
app.get("/users/:id", async (req, res) => {
  const userID = parseInt(req.params.id);
  const user = await getUserByID(userID);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Tutorial BD6.5
async function validateUser(user){
  if(!user.name || typeof user.name !=="string"){
    return "'name' field is required in 'string' format"
  }
  if (!user.email || typeof user.email !=="string"){
    return "'email' field is required in 'string' format"
  } 
}

// 2. Add a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  // if (!name || !email) {
  //   return res
  //     .status(400)
  //     .json({ message: "Missing required fields: name, email" });
  // }

  // Tutorial BD6.5 - validation testing
  let error = await validateUser(req.body)
  if(error) return res.status(400).json({message: error})
  const newUser = { name, email };
  const addedUser = await addUser(newUser);
  res.status(201).json(addedUser);
});

// ======================= Tutorial: BD6.4 =======================
// Review APIs

module.exports = { app };
