// import { getBooks, getBook, addBook } from "../book.js";
// import { describe, it } from "jest";
let { getBooks, getBook, addBook } = require("../book");

describe("Books function", () => {
  it("should return all books", () => {
    let books = getBooks();
    expect(books.length).toBe(7);
    expect(books).toEqual([
      { ID: 1, Name: "To Kill a Mockingbird", Author: "Harper Lee" },
      { ID: 2, Name: "1984", Author: "George Orwell" },
      { ID: 3, Name: "The Great Gatsby", Author: "F. Scott Fitzgerald" },
      { ID: 4, Name: "Pride and Prejudice", Author: "Jane Austen" },
      { ID: 5, Name: "The Catcher in the Rye", Author: "J.D. Salinger" },
      { ID: 6, Name: "The Lord of the Rings", Author: "J.R.R. Tolkien" },
      { ID: 7, Name: "Moby Dick", Author: "Herman Melville" },
    ]);
  });

  it("should return a book by ID", () => {
    let book = getBook(1);
    expect(book).toEqual({
      ID: 1,
      Name: "To Kill a Mockingbird",
      Author: "Harper Lee",
    });
  });

  it("should return unavailable for non-existent book", () => {
    let book = getBook(15);
    expect(book).toBeUndefined();
  });

  it("should add a new book", () => {
    let newBook = { Name: "A", Author: "B" };
    let addedBook = addBook(newBook);
    expect(addedBook).toEqual({ ID: 8, Name: "A", Author: "B" });
    let books = getBooks();
    expect(books.length).toBe(8);
  });
});

// npm run test