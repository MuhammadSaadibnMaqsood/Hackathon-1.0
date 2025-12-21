import { describe, expect, test, vi } from "vitest";
import { getLogin } from "../config/supabasefunctions";
import { supabaseCl } from "../config/supabaseClient";

// MOCK DEPENDENCY
vi.mock("../config/supabaseClient", () => ({
  supabaseCl: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe("Supabase login unit test", () => {
  test("login succeeds with valid credentials", async () => {
    supabaseCl.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: "1" } },
      error: null,
    });

    const result = await getLogin("test@gmail.com", "123456");

    expect(result.success).toBe(true);
    expect(result.user.id).toBe("1");
  });

  test("login fails with invalid credentials", async () => {
    supabaseCl.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid login credentials" },
    });

    const result = await getLogin("test@gmail.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid login credentials");
  });
});
