const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/AuthMiddleware");

process.env.JWT_SECRET = "test_secret";

const app = express();

app.get("/protected", auth, (req, res) => {
  res.status(200).json({ userId: req.user.id });
});

describe("Auth Middleware", () => {
  test("rejects missing Authorization header", async () => {
    const res = await request(app).get("/protected");
    expect(res.statusCode).toBe(401);
  });

  test("rejects invalid token format", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Token abc");

    expect(res.statusCode).toBe(401);
  });

  test("rejects invalid token", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalid-token");

    expect(res.statusCode).toBe(401);
  });

  test("allows valid token and attaches user id", async () => {
    const token = jwt.sign({ id: "user123" }, process.env.JWT_SECRET);

    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBe("user123");
  });
});