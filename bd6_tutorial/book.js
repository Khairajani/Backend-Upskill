let books = [
  { ID: 1, Name: "To Kill a Mockingbird", Author: "Harper Lee" },
  { ID: 2, Name: "1984", Author: "George Orwell" },
  { ID: 3, Name: "The Great Gatsby", Author: "F. Scott Fitzgerald" },
  { ID: 4, Name: "Pride and Prejudice", Author: "Jane Austen" },
  { ID: 5, Name: "The Catcher in the Rye", Author: "J.D. Salinger" },
  { ID: 6, Name: "The Lord of the Rings", Author: "J.R.R. Tolkien" },
  { ID: 7, Name: "Moby Dick", Author: "Herman Melville" },
];

function getBooks() {
  return books;
}

function getBook(id) {
  let book = books.find((book) => book.ID === id);
  // if (book === undefined) {
  //   return null;
  // }
  return book;
}

function addBook(book) {
  let newBook = { ID: books.length + 1, ...book };
  books.push(newBook);
  return newBook;
}

// Not required, already exists in the reveiew.js file
// let reviews = [{ id: 1, bookId: 1, content: "Great product!" }];

// function getReviews() {
//   return reviews;
// }

// function getReview(id) {
//   return reviews.find((review) => review.id === id);
// }

// export { getBooks, getBook, addBook };
module.exports = { getBooks, getBook, addBook };
