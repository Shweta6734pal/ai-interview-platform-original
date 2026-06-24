const request = require("supertest");
const createTestApp = require("./helpers/app");
const { connectTestDB, clearTestDB, closeTestDB } = require("./helpers/db");

process.env.JWT_SECRET = "test_secret";

const authRoutes = require("../routes/AuthRoute");
const User = require("../models/User");

const app = createTestApp([{ path: "/api/auth", router: authRoutes }]);

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

describe("Auth API", () => {
  test("registers user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
    expect(res.body.password).toBeUndefined();
  });

  test("rejects registration without name", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("rejects registration without email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      password: "secret123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("rejects registration without password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
    });

    expect(res.statusCode).toBe(400);
  });

  test("rejects short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("rejects duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret123",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Another User",
      email: "test@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("logs in successfully", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("rejects login with wrong email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("rejects login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
  });

  test("login response includes token and user data", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "secret123",
    });

    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("email", "test@example.com");
    expect(res.body).toHaveProperty("token");
  });
});