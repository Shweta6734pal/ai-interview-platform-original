const InterviewSession = require("../models/InterviewSession");
const Question = require("../models/Question");
const { evaluateAnswer } = require("../utils/Ai");
const mongoose = require("mongoose");

const getRequiredQuestionCount = (topic) => (topic === "DSA" ? 3 : 5);

const getInterviewQuestions = async (topic) => {
  if (topic !== "DSA") {
    return Question.aggregate([{ $match: { topic } }, { $sample: { size: 5 } }]);
  }

  const questionsByDifficulty = await Promise.all(
    ["easy", "medium", "hard"].map((difficulty) =>
      Question.find({ topic, difficulty })
    )
  );

  const selectedQuestions = questionsByDifficulty
    .map((questions) => questions[Math.floor(Math.random() * questions.length)])
    .filter(Boolean);

  if (selectedQuestions.length >= 3) {
    return selectedQuestions;
  }

  const selectedIds = selectedQuestions.map((question) => question._id);
  const fallbackPool = await Question.find({
    topic,
    _id: { $nin: selectedIds },
  });

  const fallbackQuestions = fallbackPool
    .sort(() => Math.random() - 0.5)
    .slice(0, 3 - selectedQuestions.length);

  return [...selectedQuestions, ...fallbackQuestions];
};

const findUserSession = (sessionId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return null;
  }

  return InterviewSession.findOne({ _id: sessionId, userId }).populate("questions");
};

// 1. START INTERVIEW
exports.startInterview = async (req, res) => {
  try {
    const { topic } = req.body;

    console.log("Selected topic:", topic);
    console.log("Authenticated user:", req.user);

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const questions = await getInterviewQuestions(topic);
    const requiredQuestionCount = getRequiredQuestionCount(topic);

    console.log("Questions found:", questions.length);

    if (!questions || questions.length < requiredQuestionCount) {
      return res.status(400).json({
        message: `At least ${requiredQuestionCount} questions are required for this topic`,
      });
    }

    const session = await InterviewSession.create({
      userId: req.user.id,
      questions: questions.map((q) => q._id),
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      status: "in-progress",
    });

    console.log("Interview session created:", session._id);

    res.status(200).json({
      message: "Interview started",
      sessionId: session._id,
      totalQuestions: session.questions.length,
    });
  } catch (err) {
    console.error("START INTERVIEW ERROR:", err);

    res.status(500).json({
      message: "Failed to start interview",
      error: err.message,
    });
  }
};

// 2. GET CURRENT QUESTION
exports.getCurrentQuestion = async (req, res) => {
  try {
    console.log("Fetching question for session:", req.params.id);

    const session = await findUserSession(req.params.id, req.user.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    console.log("Session found:", session._id);
    console.log("Current question index:", session.currentQuestionIndex);
    console.log("Total populated questions:", session.questions.length);

    const index = session.currentQuestionIndex;

    if (index >= session.questions.length) {
      return res.status(200).json({ message: "Interview completed" });
    }

    const question = session.questions[index];

    if (!question) {
      return res.status(500).json({
        message: "Question could not be loaded from session",
      });
    }

    console.log("Question loaded:", question._id, question.topic, question.difficulty);

    res.status(200).json({
      totalQuestions: session.questions.length,
      question: {
        _id: question._id,
        title: question.title,
        description: question.description || "",
        topic: question.topic,
        difficulty: question.difficulty,
        type: question.type || "theory",
        examples: question.examples || [],
        constraints: question.constraints || [],
        expectedComplexity: question.expectedComplexity || "",
      },
    });
  } catch (err) {
    console.error("GET QUESTION ERROR:", err);
    res.status(500).json({
      message: "Failed to load current question",
      error: err.message,
    });
  }
};

// 3. SUBMIT ANSWER
exports.submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const session = await findUserSession(req.params.id, req.user.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const index = session.currentQuestionIndex;

    if (index >= session.questions.length) {
      return res.status(400).json({ message: "Interview already completed" });
    }

    const question = session.questions[index];
    const aiResult = await evaluateAnswer(question.title, answer, {
      topic: question.topic,
      type: question.type || "theory",
    });

    session.answers.push({
      questionId: question._id,
      questionText: question.title,
      userAnswer: answer,
      score: aiResult.score,
      feedback: aiResult.feedback,
      rubricType: aiResult.rubricType,
      rubric: aiResult.rubric,
      strengths: aiResult.strengths,
      improvements: aiResult.improvements,
    });

    session.score += aiResult.score;
    session.currentQuestionIndex += 1;

    await session.save();

    res.status(200).json({
      message: "Answer submitted",
      score: aiResult.score,
      feedback: aiResult.feedback,
      rubricType: aiResult.rubricType,
      rubric: aiResult.rubric,
      nextQuestionIndex: session.currentQuestionIndex,
    });
  } catch (err) {
    console.error("SUBMIT ANSWER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 4. END INTERVIEW
exports.endInterview = async (req, res) => {
  try {
    const session = await findUserSession(req.params.id, req.user.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.status = "completed";
    await session.save();

    const totalQuestions = session.questions.length;
    const answeredQuestions = session.answers.length;

    const accuracy =
      answeredQuestions > 0
        ? Number(((session.score / (answeredQuestions * 10)) * 100).toFixed(1))
        : 0;

    const overallFeedback =
      accuracy >= 80
        ? "Excellent performance. You showed strong understanding and consistency."
        : accuracy >= 60
        ? "Good job. You have a solid base, but there is room to improve depth and clarity."
        : "Decent attempt. Focus more on fundamentals and structured explanations.";

    res.status(200).json({
      message: "Interview ended",
      totalScore: session.score,
      totalQuestions,
      answeredQuestions,
      accuracy,
      overallFeedback,
      answers: session.answers,
      completedAt: session.updatedAt,
    });
  } catch (err) {
    console.error("END INTERVIEW ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 5. DASHBOARD SUMMARY
exports.getDashboardSummary = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.user.id })
      .populate("questions", "topic difficulty")
      .sort({ createdAt: -1, _id: -1 });

    const completedSessions = sessions.filter(
      (session) => session.status === "completed"
    );

    const totalSessions = sessions.length;
    const totalCompleted = completedSessions.length;

    const totalQuestionsAnswered = completedSessions.reduce(
      (sum, session) => sum + session.answers.length,
      0
    );

    const totalScore = completedSessions.reduce(
      (sum, session) => sum + session.score,
      0
    );

    const averageScore =
      totalCompleted > 0 ? Number((totalScore / totalCompleted).toFixed(1)) : 0;

    const averageAccuracy =
      totalQuestionsAnswered > 0
        ? Number(((totalScore / (totalQuestionsAnswered * 10)) * 100).toFixed(1))
        : 0;

    const bestScore = completedSessions.reduce(
      (max, session) => Math.max(max, session.score),
      0
    );

    const topicBreakdownMap = {};
    const weakTopicMap = {};

    completedSessions.forEach((session) => {
      const sessionTopics = [
        ...new Set(
          session.questions.map((question) => question?.topic).filter(Boolean)
        ),
      ];

      const answeredQuestions = session.answers.length;
      const sessionAccuracy =
        answeredQuestions > 0
          ? (session.score / (answeredQuestions * 10)) * 100
          : 0;

      sessionTopics.forEach((topic) => {
        topicBreakdownMap[topic] = (topicBreakdownMap[topic] || 0) + 1;

        if (!weakTopicMap[topic]) {
          weakTopicMap[topic] = {
            topic,
            attempts: 0,
            totalAccuracy: 0,
          };
        }

        weakTopicMap[topic].attempts += 1;
        weakTopicMap[topic].totalAccuracy += sessionAccuracy;
      });
    });

    const topicBreakdown = Object.entries(topicBreakdownMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);

   const weakTopics = Object.values(weakTopicMap)
  .map((item) => ({
    topic: item.topic,
    attempts: item.attempts,
    averageAccuracy: Number((item.totalAccuracy / item.attempts).toFixed(1)),
  }))
  .filter((item) => item.averageAccuracy < 60) // threshold
  .sort((a, b) => a.averageAccuracy - b.averageAccuracy)
  .slice(0, 5);

    const recentSessions = sessions.slice(0, 15).map((session, index) => {
      const answeredQuestions = session.answers.length;
      const scorePercentage =
        answeredQuestions > 0
          ? Number(((session.score / (answeredQuestions * 10)) * 100).toFixed(1))
          : 0;

      return {
        id: session._id,
        attemptNumber: totalSessions - index,
        status: session.status,
        score: session.score,
        totalQuestions: session.questions.length,
        answeredQuestions,
        scorePercentage,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        topics: [
          ...new Set(
            session.questions.map((question) => question?.topic).filter(Boolean)
          ),
        ],
      };
    });

    res.status(200).json({
      totalSessions,
      totalCompleted,
      totalQuestionsAnswered,
      averageScore,
      averageAccuracy,
      bestScore,
      topicBreakdown,
      weakTopics,
      recentSessions,
    });
  } catch (err) {
    console.error("DASHBOARD SUMMARY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
