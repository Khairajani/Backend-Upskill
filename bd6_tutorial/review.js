// Constants
const reviews = [
  { id: 1, content: "Great product!", userID: 1 },
  { id: 2, content: "Not what I expected.", userID: 2 },
  { id: 3, content: "Decent quality for the price.", userID: 3 },
  { id: 4, content: "Absolutely fantastic!", userID: 4 },
  { id: 5, content: "Wouldn’t recommend.", userID: 5 },
  { id: 6, content: "Good writing.", bookID: 4 },
  { id: 7, content: "I mean....master class.", bookID: 5 },
];

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
  { id: 4, name: "Diana", email: "diana@example.com" },
  { id: 5, name: "Eve", email: "eve@example.com" },
];

// Helper functions
async function getAllReviews() {
  return reviews;
}

async function getReviewByID(id) {
  return reviews.find((r) => r.id === id);
}

async function addReview(review) {
  let newReview = { id: reviews.length + 1, ...review };
  reviews.push(newReview);
  return newReview;
}

async function getUserByID(id) {
  return users.find((u) => u.id === id);
}

async function addUser(user) {
  let newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return newUser;
}

module.exports = {
  getAllReviews,
  getReviewByID,
  addReview,
  getUserByID,
  addUser
};
