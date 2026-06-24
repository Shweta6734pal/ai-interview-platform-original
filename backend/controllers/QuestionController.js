const Question = require("../models/Question");

// Add Question
exports.addQuestion = async (req, res) => {
  try {
    const { title, description, topic, difficulty } = req.body;

    if (!title || !topic || !difficulty) {
      return res.status(400).json({
        message: "Title, topic and difficulty are required",
      });
    }

    const question = await Question.create({
      title,
      description,
      topic,
      difficulty,
    });

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Questions OR Filter by Topic/Difficulty
exports.getQuestions = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;

    const filter = {};

    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter).sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Question
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
