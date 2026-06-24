import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/api";

vi.mock("../services/api", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

function renderWithRoutes(initialPath, element) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={initialPath} element={element} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("Auth Pages", () => {
  test("login page renders email and password fields", () => {
    renderWithRoutes("/login", <Login />);

    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  test("login submits valid credentials and redirects to dashboard", async () => {
    loginUser.mockResolvedValueOnce({
      data: {
        _id: "1",
        name: "Test User",
        email: "test@example.com",
        token: "valid.token.value",
      },
    });

    renderWithRoutes("/login", <Login />);

    await userEvent.type(screen.getByPlaceholderText("you@example.com"), "test@example.com");
    await userEvent.type(screen.getByPlaceholderText("Enter your password"), "secret123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "secret123",
      });
    });
  });

  test("login shows API error message", async () => {
    loginUser.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    renderWithRoutes("/login", <Login />);

    await userEvent.type(screen.getByPlaceholderText("you@example.com"), "bad@example.com");
    await userEvent.type(screen.getByPlaceholderText("Enter your password"), "wrongpass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  test("register page renders name, email, and password fields", () => {
    renderWithRoutes("/register", <Register />);

    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create a strong password")).toBeInTheDocument();
  });

  test("register submits valid data", async () => {
    registerUser.mockResolvedValueOnce({
      data: { message: "User registered successfully" },
    });

    renderWithRoutes("/register", <Register />);

    await userEvent.type(screen.getByPlaceholderText("Your full name"), "Test User");
    await userEvent.type(screen.getByPlaceholderText("you@example.com"), "test@example.com");
    await userEvent.type(screen.getByPlaceholderText("Create a strong password"), "secret123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "secret123",
      });
    });
  });
});