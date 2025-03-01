const request = require("supertest");
const {
  getAllReviews,
  getReviewByID,
  addReview,
  getUserByID,
  addUser,
} = require("../review.js");

const { getBooks, getBook, addBook } = require("../book.js");
const { app } = require("../index.js");
const http = require("http");
const { deserialize } = require("v8");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getBooks: jest.fn(),
  getBook: jest.fn(),
}));

jest.mock("../review.js", () => ({
  ...jest.requireActual("../review.js"),
  getAllReviews: jest.fn(),
  getReviewByID: jest.fn(),
  addReview: jest.fn(),
  getUserByID: jest.fn(),
  addUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints BD6.3", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /reviews->getAllReviews() should return all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userID: 1 },
      { id: 2, content: "Not what I expected.", userID: 2 },
    ];
    getAllReviews.mockResolvedValue(mockReviews);
    const response = await request(server).get("/reviews");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReviews);
  });

  it("/reviews/:id->getReviewByID() should return review by ID", async () => {
    const mockReview = { id: 1, content: "Great product!", userID: 1 };
    getReviewByID.mockResolvedValue(mockReview);
    const response = await request(server).get("/reviews/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReview);
  });

  it("POST /reviews->addReview() should return new reviews with ID", async () => {
    const mockReview = { id: 3, content: "Awesome", userID: 10 };
    addReview.mockResolvedValue(mockReview);

    const response = await request(server)
      .post("/reviews")
      .send({ content: "Awesome", userID: 10 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockReview);
  });

  it("GET /users/:id->getUserByID() should return user by ID", async () => {
    const mockUser = { id: 1, name: "Alice", email: "alice@example.com" };
    getUserByID.mockResolvedValue(mockUser);
    const response = await request(server).get("/users/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it("POST /users->addUser() should return new user with ID", async () => {
    const mockUser = { id: 3, name: "Bob", email: "bob@example.com" };
    addUser.mockResolvedValue(mockUser);

    const response = await request(server)
      .post("/users")
      .send({ name: "Bob", email: "bob@example.com" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it("should return 404 for non-existent reviews", async () => {
    getReviewByID.mockResolvedValue(null);
    const response = await request(server).get("/reviews/100");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Review not found");
  });
});

describe("API Endpoints BD6.4: Error handling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/books return 404 if no books found", async () => {
    getBooks.mockReturnValue([]);

    let response = await request(server).get("/api/books");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No books found");
  });

  it("GET /api/books/:id return 404 if book not found", async () => {
    getBook.mockReturnValue(null);

    let response = await request(server).get("/api/books/100");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe(
      "The book with the given ID was not found.",
    );
  });
});
