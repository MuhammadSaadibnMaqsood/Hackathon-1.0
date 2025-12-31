import { describe, expect, test, vi, beforeEach } from "vitest";
import {
  getAllOppointments,
  getAppoint,
  getSession,
} from "../config/supabasefunctions";
import { getAppointedFunc } from "../functions/getAppointmentPage";

vi.mock("../config/supabasefunctions", () => ({
  getSession: vi.fn(),
  getAppoint: vi.fn(),
  getAllOppointments: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Get Appointment Function Unit Test", () => {
  test("Should fail when date is missing", async () => {
    const result = await getAppointedFunc("Dr A", {
      date: "",
      timing: "10:00",
    });

    expect(result.success).toBe(false);
  });

  test("Should fail when timing is missing", async () => {
    const result = await getAppointedFunc("Dr A", {
      date: "2025-01-10",
      timing: "",
    });

    expect(result.success).toBe(false);
  });

  test("Should fail when appointments are full", async () => {
    getSession.mockResolvedValue({
      session: { user: { email: "test@gmail.com" } },
    });

    getAllOppointments.mockResolvedValue(new Array(20).fill({}));

    const result = await getAppointedFunc("Dr A", {
      date: "2025-01-10",
      timing: "10:00",
    });

    expect(result.success).toBe(false);
  });

  test("Should fail when slot is already booked", async () => {
    getSession.mockResolvedValue({
      session: { user: { email: "test@gmail.com" } },
    });

    getAllOppointments.mockResolvedValue([{ time: "10:00" }]);

    const result = await getAppointedFunc("Dr A", {
      date: "2025-01-10",
      timing: "10:00",
    });

    expect(result.success).toBe(false);
  });

  test("Should book appointment successfully", async () => {
    getSession.mockResolvedValue({
      session: { user: { email: "test@gmail.com" } },
    });

    getAllOppointments.mockResolvedValue([]);
    getAppoint.mockResolvedValue(true);

    const result = await getAppointedFunc("Dr A", {
      date: "2025-01-10",
      timing: "11:00",
    });

    expect(result.success).toBe(true);
  });

  test("shoud fail when session is missing", async () => {
    getSession.mockResolvedValue({
      session: { user: { email: "" } },
    });

    const result = await getAppointedFunc("Dr A", {
      date: "2025-01-10",
      timing: "11:00",
    });

    expect(result.success).toBe(false);
  });
});
