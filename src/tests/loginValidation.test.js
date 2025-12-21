import { describe, test, expect } from "vitest";
import { validateLogin } from "../functions/validation/authvalidation";


describe("Login validation unit tests", () => {
  test("fail when email is empty", () => {
    const result = validateLogin("", "123456");
    expect(result).toBe("Email is required");
  });

  test("fail when password is empty", () => {
    const result = validateLogin("test@gmail.com", "");
    expect(result).toBe("Password is required");
  });

  test("fail when email is invalid", () => {
    const result = validateLogin("test.com", "12345");
    expect(result).toBe("Invalid email");
  });

  test("passes for valid email and password", () => {
    const result = validateLogin("test@gmail.com", "123456");
    expect(result).toBe("valid");
  });
});
