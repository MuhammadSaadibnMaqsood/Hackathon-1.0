import { describe, expect, test, vi } from "vitest";
import { supabaseCl } from "../config/supabaseClient";
import { getSignup } from "../config/supabasefunctions";

vi.mock("../config/supabaseClient", () => ({
  supabaseCl: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

describe("Unit testing for getSignup function", () => {
  test("signup successful with valid credentials", async () => {
    supabaseCl.auth.signUp.mockResolvedValue({
      data: { user: { id: "1" } },
      error: null,
    });

    const result = await getSignup("test@gmail.com", "123456");

    expect(result.success).toBe(true);
    expect(result.user.id).toBe("1");
  });

  test("signup fails with invalid credentials", async () => {
    supabaseCl.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: "Invalid credentials" },
    });

    const result = await getSignup("test@gmail.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid credentials");
  });

  test("signup fails when user already exists", async () => {
    supabaseCl.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: "User already exists" },
    });

    const result = await getSignup("test@gmail.com", "123456");

    expect(result.success).toBe(false);
    expect(result.message).toBe("User already exists");
  });
});
