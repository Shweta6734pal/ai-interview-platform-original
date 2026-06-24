import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test } from "vitest";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import { waitFor } from "@testing-library/react";

function createToken(payload) {
  return `header.${btoa(JSON.stringify(payload))}.signature`;
}

function renderProtected() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("ProtectedRoute", () => {
  test("redirects unauthenticated user to login", () => {
    renderProtected();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("allows valid token", () => {
    localStorage.setItem(
      "token",
      createToken({ id: "123", exp: Math.floor(Date.now() / 1000) + 3600 })
    );

    renderProtected();

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

 
  test("removes expired token and redirects", () => {
  localStorage.setItem(
    "token",
    createToken({
      id: "123",
      exp: Math.floor(Date.now() / 1000) - 10,
    })
  );

  renderProtected();

  expect(screen.getByText("Login Page")).toBeInTheDocument();
});
});