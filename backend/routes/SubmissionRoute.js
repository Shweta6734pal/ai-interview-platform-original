const express = require("express");
const router = express.Router();

const {
    submitAnswer,
    getUserSubmissions
} = require("../controllers/SubmissionController");

router.post("/", submitAnswer);
router.get("/:userId", getUserSubmissions);

module.exports = router;
