import { describe, expect, test } from "vitest";
import { validateSignup } from "../functions/validation/authvalidation";

describe("Unit testing for signup validation", () => {
  test("fails when email is empty", () => {
    const result = validateSignup("", "123456", "123456");

    expect(result).toBe("Email missing");
  });

  test("fail when email is invalid", () => {
    const result = validateSignup("test.com", "123456", "123456");

    expect(result).toBe("Invalid email");
  });

  test("fails when password is empty", () => {
    const result = validateSignup("test@gmail.com", "", "123456");

    expect(result).toBe("password missing");
  });

  test("fails when confirm password is empty", () => {
    const result = validateSignup("test@gmail.com", "123456", "");
    expect(result).toBe("Confirm password missing");
  });
  test("fails when confirm password not same as password", () => {
    const result = validateSignup("test@gmail.com", "123456", "1987456");
    expect(result).toBe("Password mismatch");
  });
  test("fails when password length is smaller then 6", () => {
    const result = validateSignup("test@gmail.com", "12345", "12345");
    expect(result).toBe("Password must be atleast 6 character long");
  });

  test("pass when all crediantail are correct", () => {
    const result = validateSignup("test@gmail.com", "123456", "123456");
    expect(result).toBe("valid");
  });
});
