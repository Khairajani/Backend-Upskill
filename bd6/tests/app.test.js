const request = require("supertest");
const { app } = require("../../index.js");
const http = require("http");
const { deserialize } = require("v8");
const {getEmployees} = require("../controller/index.js");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getEmployees: jest.fn(),
  }));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3003, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller function tests : BD6.6", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /employees->getEmployees() should return all reviews", async () => {
    const mockEmployees = [
        { id: 4, name: "Emily Williams", position: "Data Scientist", department: "Analytics" },
        { id: 5, name: "Robert Brown", position: "Marketing Specialist", department: "Marketing" }
      ];
    getEmployees.mockResolvedValue(mockEmployees);
    const response = await request(server).get("/employees");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({employees:mockEmployees});
  });

  it("GET /employees/:id->getEmployees(id) should return review by ID", async () => {
    const mockEmployee =  { id: 4, name: "Emily Williams", position: "Data Scientist", department: "Analytics" };
    getEmployees.mockReturnValue(mockEmployee);
    const response = await request(server).get("/employees/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({"employee":mockEmployee});
  });

  it("should return 404 for non-existent employee", async () => {
    getEmployees.mockReturnValue(null);
    const response = await request(server).get("/employees/1");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No employee found with ID 1");
  });
});