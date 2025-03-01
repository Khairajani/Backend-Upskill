let authors = [
  { ID: 1, Name: "Harper Lee", Book: "To Kill a Mockingbird" },
  { ID: 2, Name: "George Orwell", Book: "1984" },
  { ID: 3, Name: "Jane Austen", Book: "Pride and Prejudice" },
  { ID: 4, Name: "J.R.R. Tolkien", Book: "The Lord of the Rings" },
  { ID: 5, Name: "Herman Melville", Book: "Moby Dick" },
];

function getAuthors() {
  return authors;
}

function getAuthor(id) {
  let author = authors.find((author) => author.ID === id);
  return author;
}

function addAuthor(author) {
  authors.push(author);
  return author;
}

module.exports = { getAuthors, getAuthor, addAuthor };
