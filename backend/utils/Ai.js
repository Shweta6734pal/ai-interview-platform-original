const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const theoryRubricSchema = {
  type: "object",
  properties: {
    correctness: { type: "integer", minimum: 0, maximum: 4 },
    depth: { type: "integer", minimum: 0, maximum: 2 },
    clarity: { type: "integer", minimum: 0, maximum: 2 },
    examples: { type: "integer", minimum: 0, maximum: 1 },
    completeness: { type: "integer", minimum: 0, maximum: 1 },
  },
  required: ["correctness", "depth", "clarity", "examples", "completeness"],
};

const codingRubricSchema = {
  type: "object",
  properties: {
    correctness: { type: "integer", minimum: 0, maximum: 4 },
    algorithm: { type: "integer", minimum: 0, maximum: 2 },
    complexity: { type: "integer", minimum: 0, maximum: 2 },
    codeQuality: { type: "integer", minimum: 0, maximum: 1 },
    explanation: { type: "integer", minimum: 0, maximum: 1 },
  },
  required: ["correctness", "algorithm", "complexity", "codeQuality", "explanation"],
};

const evaluationSchema = {
  type: "object",
  properties: {
    score: {
      type: "integer",
      minimum: 0,
      maximum: 10,
      description: "Final score from 0 to 10, equal to the sum of rubric scores.",
    },
    feedback: {
      type: "string",
      description: "Short, useful feedback for the candidate.",
    },
    strengths: {
      type: "array",
      items: { type: "string" },
      description: "Specific strengths in the answer.",
    },
    improvements: {
      type: "array",
      items: { type: "string" },
      description: "Specific improvements the candidate should make.",
    },
    rubric: {
      type: "object",
      properties: {
        correctness: { type: "integer", minimum: 0, maximum: 4 },
        depth: { type: "integer", minimum: 0, maximum: 2 },
        clarity: { type: "integer", minimum: 0, maximum: 2 },
        examples: { type: "integer", minimum: 0, maximum: 1 },
        completeness: { type: "integer", minimum: 0, maximum: 1 },
        algorithm: { type: "integer", minimum: 0, maximum: 2 },
        complexity: { type: "integer", minimum: 0, maximum: 2 },
        codeQuality: { type: "integer", minimum: 0, maximum: 1 },
        explanation: { type: "integer", minimum: 0, maximum: 1 },
      },
    },
  },
  required: ["score", "feedback", "strengths", "improvements", "rubric"],
};

function clampScore(score, max) {
  const numericScore = Number(score);

  if (Number.isNaN(numericScore)) {
    return 0;
  }

  return Math.max(0, Math.min(max, Math.round(numericScore)));
}

function normalizeRubric(rawRubric, rubricType) {
  const rubric = rawRubric || {};

  if (rubricType === "coding") {
    return {
      correctness: clampScore(rubric.correctness, 4),
      algorithm: clampScore(rubric.algorithm, 2),
      complexity: clampScore(rubric.complexity, 2),
      codeQuality: clampScore(rubric.codeQuality, 1),
      explanation: clampScore(rubric.explanation, 1),
    };
  }

  return {
    correctness: clampScore(rubric.correctness, 4),
    depth: clampScore(rubric.depth, 2),
    clarity: clampScore(rubric.clarity, 2),
    examples: clampScore(rubric.examples, 1),
    completeness: clampScore(rubric.completeness, 1),
  };
}

function getRubricTotal(rubric) {
  return Object.values(rubric).reduce((sum, value) => sum + Number(value || 0), 0);
}

function buildRubricInstructions(rubricType) {
  if (rubricType === "coding") {
    return `
Use this coding rubric:
- correctness: 0-4, whether the solution is logically correct for the problem
- algorithm: 0-2, whether the chosen approach is efficient and appropriate
- complexity: 0-2, whether time and space complexity are explained correctly
- codeQuality: 0-1, readability, structure, and edge-case awareness
- explanation: 0-1, clarity of approach explanation
The final score must equal the sum of these categories.
`;
  }

  return `
Use this theory rubric:
- correctness: 0-4, factual accuracy
- depth: 0-2, depth of concept understanding
- clarity: 0-2, communication and structure
- examples: 0-1, useful examples or practical connection
- completeness: 0-1, covers the important parts of the question
The final score must equal the sum of these categories.
`;
}

async function evaluateAnswer(question, answer, options = {}) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key") {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const rubricType = options.type === "coding" || options.topic === "DSA" ? "coding" : "theory";
  const rubricSchema = rubricType === "coding" ? codingRubricSchema : theoryRubricSchema;

  const prompt = `
You are a strict but fair technical interview evaluator.

Evaluate the candidate's answer using the fixed rubric below. Return only JSON that matches the requested schema.
${buildRubricInstructions(rubricType)}

Question:
${question}

Candidate answer:
${answer}
`;

  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: prompt,
  //   config: {
  //     responseMimeType: "application/json",
  //     responseJsonSchema: {
  //       ...evaluationSchema,
  //       properties: {
  //         ...evaluationSchema.properties,
  //         rubric: rubricSchema,
  //       },
  //     },
  //     temperature: 0.2,
  //   },
  // });
  try {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        ...evaluationSchema,
        properties: {
          ...evaluationSchema.properties,
          rubric: rubricSchema,
        },
      },
      temperature: 0.2,
    },
  });

  const result = JSON.parse(response.text);

  const strengths = Array.isArray(result.strengths)
    ? result.strengths
    : [];

  const improvements = Array.isArray(result.improvements)
    ? result.improvements
    : [];

  const rubric = normalizeRubric(
    result.rubric,
    rubricType
  );

  const rubricScore = getRubricTotal(rubric);

  const feedbackSections = [
    result.feedback,
    strengths.length
      ? `Strengths: ${strengths.join(", ")}`
      : "",
    improvements.length
      ? `Improvements: ${improvements.join(", ")}`
      : "",
  ].filter(Boolean);

  return {
    score: rubricScore,
    feedback: feedbackSections.join("\n\n"),
    rubricType,
    rubric,
    strengths,
    improvements,
  };
} catch (error) {
  console.error("Gemini Error:", error);

  const emptyRubric =
    rubricType === "coding"
      ? {
          correctness: 0,
          algorithm: 0,
          complexity: 0,
          codeQuality: 0,
          explanation: 0,
        }
      : {
          correctness: 0,
          depth: 0,
          clarity: 0,
          examples: 0,
          completeness: 0,
        };

  return {
    score: 0,
    feedback:
      "AI evaluation service is temporarily unavailable. Please try again later.",
    rubricType,
    rubric: emptyRubric,
    strengths: [],
    improvements: [],
  };
}
}

module.exports = { evaluateAnswer };
