const request = require("supertest");
const createTestApp = require("./helpers/app");
const { connectTestDB, clearTestDB, closeTestDB } = require("./helpers/db");

const questionRoutes = require("../routes/QuestionRoute");
const Question = require("../models/Question");

const app = createTestApp([{ path: "/api/question", router: questionRoutes }]);

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

describe("Question API", () => {
  test("adds question successfully", async () => {
    const res = await request(app).post("/api/question").send({
      title: "What is DBMS?",
      topic: "DBMS",
      difficulty: "easy",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.question.title).toBe("What is DBMS?");
  });

  test("rejects question without title", async () => {
    const res = await request(app).post("/api/question").send({
      topic: "DBMS",
      difficulty: "easy",
    });

    expect(res.statusCode).toBe(400);
  });

  test("gets all questions", async () => {
    await Question.create({
      title: "What is OS?",
      topic: "OS",
      difficulty: "easy",
    });

    const res = await request(app).get("/api/question");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("filters questions by topic", async () => {
    await Question.create([
      { title: "OS question", topic: "OS", difficulty: "easy" },
      { title: "DBMS question", topic: "DBMS", difficulty: "easy" },
    ]);

    const res = await request(app).get("/api/question?topic=OS");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].topic).toBe("OS");
  });

  test("gets question by valid id", async () => {
    const question = await Question.create({
      title: "What is CN?",
      topic: "CN",
      difficulty: "easy",
    });

    const res = await request(app).get(`/api/question/${question._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("What is CN?");
  });

  test("returns 404 when question does not exist", async () => {
    const id = "64b000000000000000000000";

    const res = await request(app).get(`/api/question/${id}`);

    expect(res.statusCode).toBe(404);
  });
});