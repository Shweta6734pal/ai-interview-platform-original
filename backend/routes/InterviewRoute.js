const express = require("express");
const router = express.Router();

const {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  endInterview,
  getDashboardSummary,
} = require("../controllers/InterviewController");

const auth = require("../middleware/AuthMiddleware");

router.get("/dashboard/summary", auth, getDashboardSummary);
router.post("/start", auth, startInterview);
router.get("/:id/question", auth, getCurrentQuestion);
router.post("/:id/answer", auth, submitAnswer);
router.post("/:id/end", auth, endInterview);

module.exports = router;
