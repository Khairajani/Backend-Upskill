const request = require("supertest");
const {addTrade} = require("../trades.js");
const {getStocks, stocks} = require("../stocks.js");
const { app } = require("../index.js");
const http = require("http");
const { deserialize } = require("v8");

jest.mock("../stocks.js", () => ({
  ...jest.requireActual("../stocks.js"),
  getStocks: jest.fn(),
}));

jest.mock("../trades.js", () => ({
  ...jest.requireActual("../trades.js"),
  addTrade: jest.fn(),
}));
 
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3006, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints BD6", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getStocks.mockImplementation(jest.requireActual("../stocks.js").getStocks);
    addTrade.mockImplementation(jest.requireActual("../trades.js").addTrade);
  });

  it("GET /stocks should return all stocks", async () => {
    const response = await request(server).get("/stocks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"stocks":stocks});
  });

  it("GET /stocks/:ticker should return stock by ticker for valid ticker", async () => {
    const response = await request(server).get("/stocks/AAPL");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "stock": {
        "stockId": 1,
        "ticker": "AAPL",
        "companyName": "Apple Inc.",
        "price": 150.75
      }
    });
  });

  it("POST /trades/new should return addedTrade for valid input", async () => {
    const newTrade = {
      "stockId": 1,
      "quantity":20,
      "tradeType":"sell",
      "tradeDate":"03/03/2025"
    };
    const response = await request(server)
      .post("/trades/new")
      .send(newTrade);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({"trade":{"tradeId":4,...newTrade}});
  });

  it("GET /stocks/:ticker should return proper error for invalid ticker", async () => {
    const response = await request(server).get("/stocks/XYZ");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({"message":`No stock found with TICKER XYZ`});
  }); 

  it("POST /trades/new should return validation error for invalid input", async () => {
    const newTrade = {
      "stockId": 1,
      "tradeType":"sell",
      "tradeDate":"03/03/2025"
    };
    const response = await request(server)
      .post("/trades/new")
      .send(newTrade);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({"message":"'quantity' field is required in 'integer' format"});
  });

  it("GET /stocks should return mocked getStocks() values", async () => {
    let mockedStocks = [
      { stockId: 9, ticker: 'LT', companyName: 'Larsen and Toubro Ltd', price: 3170.00 },
    ];
    getStocks.mockResolvedValue(mockedStocks)
    const response = await request(server).get("/stocks")
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"stocks":mockedStocks});
  });

  it("POST /trades/new should return mocked addTrade", async () => {
    const mockedAddedTrade = {
      "tradeId": 34,
      "stockId": 101,
      "quantity":2000,
      "tradeType":"buy",
      "tradeDate":"01/01/2025"
    };
    addTrade.mockResolvedValue(mockedAddedTrade)

    const newTrade = {
      "stockId": 1,
      "quantity":20,
      "tradeType":"sell",
      "tradeDate":"03/03/2025"
    };
    const response = await request(server)
      .post("/trades/new")
      .send(newTrade);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({"trade":mockedAddedTrade});
  });
});