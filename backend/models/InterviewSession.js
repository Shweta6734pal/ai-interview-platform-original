const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  questionText: String,
  correctAnswer: String,
  userAnswer: String,
  score: Number,
  feedback: String,
  rubricType: {
    type: String,
    enum: ["theory", "coding"],
    default: "theory",
  },
  rubric: {
    correctness: Number,
    depth: Number,
    clarity: Number,
    examples: Number,
    completeness: Number,
    algorithm: Number,
    complexity: Number,
    codeQuality: Number,
    explanation: Number,
  },
  strengths: [String],
  improvements: [String],
});

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [answerSchema],
  currentQuestionIndex: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
