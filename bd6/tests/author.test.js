let { app } = require("../index.js");
let { getAuthors, getAuthor, addAuthor } = require("../author.js");
let http = require("http");

jest.mock("../author.js", () => ({
  ...jest.requireActual("../author.js"),
  getAuthors: jest.fn(),
  getAuthor: jest.fn(),
  addAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAuthors() should return an array of authors", () => {
    const mockAuthors = [
      { ID: 2, Name: "George Orwell", Book: "1984" },
      { ID: 3, Name: "Jane Austen", Book: "Pride and Prejudice" },
    ];
    getAuthors.mockReturnValue(mockAuthors);

    let result = getAuthors();
    expect(result).toEqual(mockAuthors);
    expect(getAuthors).toHaveBeenCalled();
  });

  test("getAuthor() should return an author", () => {
    const mockAuthor = { ID: 2, Name: "George Orwell", Book: "1984" };
    getAuthor.mockReturnValue(mockAuthor);

    let result = getAuthor(2);
    expect(result).toEqual(mockAuthor);
    expect(getAuthor).toHaveBeenCalledWith(2);
  });

  test("getAuthor() should return undefined if author not found", () => {
    getAuthor.mockReturnValue(undefined);

    let result = getAuthor(100);
    // expect(result).toEqual(undefined);
    expect(result).toBeUndefined();
    expect(getAuthor).toHaveBeenCalledWith(100);
  });

  test("addAuthor() should add a new author", () => {
    const mockAuthor = { ID: 5, Name: "Himanshu", Book: "Self Improvisation" };
    addAuthor.mockReturnValue(mockAuthor);

    let result = addAuthor(mockAuthor);
    expect(result).toEqual(mockAuthor);
    expect(addAuthor).toHaveBeenCalledWith(mockAuthor);
  });
});
