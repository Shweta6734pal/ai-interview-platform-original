import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test } from "vitest";
import ResultPage from "../pages/ResultPage";
import { AuthProvider } from "../context/AuthContext";

function renderResult(routeState) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[{ pathname: "/result", state: routeState }]}>
        <Routes>
          <Route path="/result" element={<ResultPage />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/interview" element={<div>Interview Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("ResultPage", () => {
  test("shows no result data message without router state", () => {
    renderResult(null);

    expect(screen.getByText("No result data")).toBeInTheDocument();
  });

  test("renders score, accuracy, answer breakdown, and feedback", () => {
    renderResult({
      totalScore: 8,
      totalQuestions: 1,
      answeredQuestions: 1,
      accuracy: 80,
      overallFeedback: "Good job",
      answers: [
        {
          questionText: "What is encapsulation?",
          userAnswer: "Data hiding",
          score: 8,
          feedback: "Good answer",
          rubricType: "theory",
          rubric: {
            correctness: 4,
            depth: 2,
            clarity: 1,
            examples: 1,
            completeness: 0,
          },
        },
      ],
    });

    expect(screen.getByText("8/10")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Good job")).toBeInTheDocument();
    
    expect(screen.getByText("Data hiding")).toBeInTheDocument();
    expect(screen.getByText("Good answer")).toBeInTheDocument();
  });
});