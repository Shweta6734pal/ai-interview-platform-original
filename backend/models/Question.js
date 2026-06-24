const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      enum: ["DSA", "OOPS", "DBMS", "OS", "CN", "System Design"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    type: {
      type: String,
      enum: ["theory", "coding"],
      default: "theory",
    },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: [String],
    expectedComplexity: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
