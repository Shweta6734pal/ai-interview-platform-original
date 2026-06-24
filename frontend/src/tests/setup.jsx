import React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@monaco-editor/react", () => ({
  default: ({ value, onChange, language }) => (
    <textarea
      aria-label="code-editor"
      data-language={language}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

console.log("localStorage:", localStorage);
console.log("typeof clear:", typeof localStorage?.clear);

const localStorageMock = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  },
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
beforeEach(() => {
  localStorage.clear();
});


Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});