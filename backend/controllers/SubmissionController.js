const Submission = require("../models/Submission");

// Submit Answer
exports.submitAnswer = async (req, res) => {
    try {
         console.log("BODY:", req.body);
        const { userId, questionId, answer } = req.body;

        const submission = await Submission.create({
            userId,
            questionId,
            answer
        });

        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Submissions
exports.getUserSubmissions = async (req, res) => {
    try {
        const { userId } = req.params;

        const submissions = await Submission.find({ userId })
            .populate("questionId"); // shows question details

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
