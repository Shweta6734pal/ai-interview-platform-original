const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/AuthController");

const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema
} = require("../validators/authvalidators");

router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

router.post(
  "/login",
  validate(loginSchema),
  loginUser
);


const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.get("/test-gemini", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite", // or gemini-2.5-flash
      contents: "Say hello",
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
      status: err.status,
    });
  }
});

module.exports = router;
