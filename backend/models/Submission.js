const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
