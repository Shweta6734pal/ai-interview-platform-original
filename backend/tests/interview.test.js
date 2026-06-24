jest.mock("../utils/Ai", () => ({
  evaluateAnswer: jest.fn().mockResolvedValue({
    score: 8,
    feedback: "Good answer",
    rubricType: "theory",
    rubric: {
      correctness: 4,
      depth: 2,
      clarity: 1,
      examples: 1,
      completeness: 0,
    },
    strengths: ["Clear explanation"],
    improvements: ["Add more detail"],
  }),
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const createTestApp = require("./helpers/app");
const { connectTestDB, clearTestDB, closeTestDB } = require("./helpers/db");

process.env.JWT_SECRET = "test_secret";

const interviewRoutes = require("../routes/InterviewRoute");
const Question = require("../models/Question");
const User = require("../models/User");
const InterviewSession = require("../models/InterviewSession");

const app = createTestApp([{ path: "/api/interview", router: interviewRoutes }]);

let user;
let token;

beforeAll(connectTestDB);

beforeEach(async () => {
  user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "hashed-password",
  });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
});

afterEach(clearTestDB);
afterAll(closeTestDB);

function authRequest(req) {
  return req.set("Authorization", `Bearer ${token}`);
}

async function seedOOPSQuestions(count = 5) {
  const questions = [];

  for (let i = 1; i <= count; i++) {
    questions.push({
      title: `OOPS Question ${i}`,
      topic: "OOPS",
      difficulty: "easy",
      type: "theory",
    });
  }

  await Question.insertMany(questions);
}

describe("Interview API", () => {
  test("starts interview successfully for valid topic with enough questions", async () => {
    await seedOOPSQuestions(5);

    const res = await authRequest(
      request(app).post("/api/interview/start")
    ).send({ topic: "OOPS" });

    expect(res.statusCode).toBe(200);
    expect(res.body.sessionId).toBeDefined();
    expect(res.body.totalQuestions).toBe(5);
  });

  test("rejects interview start when topic is missing", async () => {
    const res = await authRequest(
      request(app).post("/api/interview/start")
    ).send({});

    expect(res.statusCode).toBe(400);
  });

  test("rejects interview start when not enough questions exist", async () => {
    await seedOOPSQuestions(2);

    const res = await authRequest(
      request(app).post("/api/interview/start")
    ).send({ topic: "OOPS" });

    expect(res.statusCode).toBe(400);
  });

  test("gets current question for valid owned session", async () => {
    await seedOOPSQuestions(5);

    const startRes = await authRequest(
      request(app).post("/api/interview/start")
    ).send({ topic: "OOPS" });

    const res = await authRequest(
      request(app).get(`/api/interview/${startRes.body.sessionId}/question`)
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.question).toBeDefined();
    expect(res.body.question.topic).toBe("OOPS");
  });

  test("submits answer, stores score, and increments current question index", async () => {
    await seedOOPSQuestions(5);

    const startRes = await authRequest(
      request(app).post("/api/interview/start")
    ).send({ topic: "OOPS" });

    const sessionId = startRes.body.sessionId;

    const res = await authRequest(
      request(app).post(`/api/interview/${sessionId}/answer`)
    ).send({ answer: "Encapsulation means keeping data protected." });

    const session = await InterviewSession.findById(sessionId);

    expect(res.statusCode).toBe(200);
    expect(res.body.score).toBe(8);
    expect(session.answers.length).toBe(1);
    expect(session.score).toBe(8);
    expect(session.currentQuestionIndex).toBe(1);
  });
});