const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions,
  getQuestionById,
} = require("../controllers/QuestionController");

router.post("/", addQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

module.exports = router;
