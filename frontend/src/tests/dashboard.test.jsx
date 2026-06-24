import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Dashboard from "../pages/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import { getDashboardSummary } from "../services/api";

vi.mock("../services/api", () => ({
  getDashboardSummary: vi.fn(),
}));

function renderDashboard() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("Dashboard", () => {
  test("renders loading state first", () => {
    getDashboardSummary.mockResolvedValueOnce({ data: {} });

    renderDashboard();

    expect(screen.getByText("Loading dashboard...")).toBeInTheDocument();
  });

  test("renders stats after API response", async () => {
    getDashboardSummary.mockResolvedValueOnce({
      data: {
        totalSessions: 4,
        totalCompleted: 3,
        averageScore: 25,
        averageAccuracy: 70,
        bestScore: 42,
        topicBreakdown: [{ topic: "DSA", count: 2 }],
        weakTopics: [{ topic: "OS", averageAccuracy: 45 }],
        recentSessions: [],
      },
    });

    renderDashboard();

    expect(await screen.findByText("4")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
    expect(screen.getByText("DSA: 2")).toBeInTheDocument();
    
  });
});