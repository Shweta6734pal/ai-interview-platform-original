const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function evaluateAnswer(question, answer) {
  const prompt = `
  Evaluate this answer:

  Question: ${question}
  Answer: ${answer}

  Give:
  1. Score (0-10)
  2. Short feedback
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

module.exports = evaluateAnswer;
