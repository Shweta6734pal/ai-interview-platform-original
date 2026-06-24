import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import InterviewPage from "../pages/InterviewPage";
import { AuthProvider } from "../context/AuthContext";
import { startInterview, getCurrentQuestion } from "../services/api";

vi.mock("../services/api", () => ({
  startInterview: vi.fn(),
  getCurrentQuestion: vi.fn(),
  submitAnswer: vi.fn(),
  endInterview: vi.fn(),
}));

function renderInterview() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/interview"]}>
        <Routes>
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/result" element={<div>Result Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("InterviewPage", () => {
  test("renders topic cards", () => {
    renderInterview();

    // expect(screen.getByText("DSA")).toBeInTheDocument();
    // expect(screen.getByText("OOPS")).toBeInTheDocument();
    // expect(screen.getByText("DBMS")).toBeInTheDocument();
    expect(screen.getAllByText("DSA")[0]).toBeInTheDocument();
expect(screen.getAllByText("OOPS")[0]).toBeInTheDocument();
expect(screen.getAllByText("DBMS")[0]).toBeInTheDocument();
expect(screen.getAllByText("Operating Systems")[0]).toBeInTheDocument();
expect(screen.getAllByText("Computer Networks")[0]).toBeInTheDocument();
   
  });

  test("requires selecting a topic before starting", async () => {
    renderInterview();

    await userEvent.click(screen.getByRole("button", { name: /start interview/i }));

    expect(screen.getByText("Please select a topic to begin.")).toBeInTheDocument();
  });

  test("starts interview and loads theory question", async () => {
    startInterview.mockResolvedValueOnce({
      data: { sessionId: "session1", totalQuestions: 5 },
    });

    getCurrentQuestion.mockResolvedValueOnce({
      data: {
        totalQuestions: 5,
        question: {
          _id: "q1",
          title: "What is encapsulation?",
          topic: "OOPS",
          difficulty: "easy",
          type: "theory",
        },
      },
    });

    renderInterview();

    //await userEvent.click(screen.getByText("OOPS"));
    await userEvent.click(screen.getAllByText("OOPS")[0]);
    await userEvent.click(screen.getByRole("button", { name: /start interview/i }));

    expect(await screen.findByText("What is encapsulation?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your answer here...")).toBeInTheDocument();
  });

  test("coding question shows language selector and code editor", async () => {
    startInterview.mockResolvedValueOnce({
      data: { sessionId: "session1", totalQuestions: 3 },
    });

    getCurrentQuestion.mockResolvedValueOnce({
      data: {
        totalQuestions: 3,
        question: {
          _id: "q1",
          title: "Two Sum",
          topic: "DSA",
          difficulty: "easy",
          type: "coding",
          examples: [],
          constraints: [],
        },
      },
    });

    renderInterview();

   // await userEvent.click(screen.getByText("DSA"));
    await userEvent.click(screen.getAllByText("DSA")[0]);
    await userEvent.click(screen.getByRole("button", { name: /start interview/i }));

    expect(await screen.findByText("Two Sum")).toBeInTheDocument();
    //expect(screen.getByDisplayValue("javascript")).toBeInTheDocument();
    screen.debug();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("code-editor")).toBeInTheDocument();
  });

  test("calls startInterview with selected topic", async () => {
    startInterview.mockResolvedValueOnce({
      data: { sessionId: "session1", totalQuestions: 5 },
    });

    getCurrentQuestion.mockResolvedValueOnce({
      data: {
        totalQuestions: 5,
        question: {
          _id: "q1",
          title: "What is DBMS?",
          topic: "DBMS",
          difficulty: "easy",
          type: "theory",
        },
      },
    });

    renderInterview();

    //await userEvent.click(screen.getByText("DBMS"));
    await userEvent.click(screen.getAllByText("DBMS")[0]);
    await userEvent.click(screen.getByRole("button", { name: /start interview/i }));

    await waitFor(() => {
      expect(startInterview).toHaveBeenCalledWith("DBMS");
    });
  });
});