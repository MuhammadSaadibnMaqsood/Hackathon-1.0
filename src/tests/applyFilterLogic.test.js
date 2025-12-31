import { describe, test, expect } from "vitest";
import { applyFiltersLogic } from "../functions/getAppointmentPage";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const doctorsMock = [
  {
    name: "Dr A",
    specialist: "Cardiologist",
    workingDays: "Monday, Wednesday, Friday",
    "shift-start": "09:00:00",
    "shift-end": "17:00:00",
  },
  {
    name: "Dr B",
    specialist: "Dermatologist",
    workingDays: "Tuesday, Thursday",
    "shift-start": "10:00:00",
    "shift-end": "14:00:00",
  },
  {
    name: "Dr C",
    specialist: "Cardiologist",
    workingDays: "Monday",
    "shift-start": "08:00:00",
    "shift-end": "12:00:00",
  },
];

describe("applyFiltersLogic", () => {
  test("returns all doctors and showResults false when no filters applied", () => {
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "", speciality: "", timing: "" },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(3);
    expect(result.showResults).toBe(false);
  });

  test("filters doctors by working day (date)", () => {
    // 2025-01-13 is Monday
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "2025-01-13", speciality: "", timing: "" },
      dayNames
    );

    expect(result.filteredDoctors.map(d => d.name)).toEqual(["Dr A", "Dr C"]);
    expect(result.showResults).toBe(true);
  });

  test("filters doctors by speciality", () => {
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "", speciality: "Dermatologist", timing: "" },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(1);
    expect(result.filteredDoctors[0].name).toBe("Dr B");
  });

  test("filters doctors by timing within shift", () => {
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "", speciality: "", timing: "10:30" },
      dayNames
    );

    expect(result.filteredDoctors.map(d => d.name)).toEqual([
      "Dr A",
      "Dr B",
      "Dr C",
    ]);
  });

  test("returns empty array when timing is outside all shifts", () => {
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "", speciality: "", timing: "18:00" },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(0);
    expect(result.showResults).toBe(true);
  });

  test("applies date + speciality + timing together", () => {
    // Monday, Cardiologist, 09:30
    const result = applyFiltersLogic(
      doctorsMock,
      {
        date: "2025-01-13",
        speciality: "Cardiologist",
        timing: "09:30",
      },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(1);
    expect(result.filteredDoctors[0].name).toBe("Dr A");
  });

  test("handles invalid date gracefully", () => {
    const result = applyFiltersLogic(
      doctorsMock,
      { date: "invalid-date", speciality: "", timing: "" },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(3);
    expect(result.showResults).toBe(true);
  });

  test("handles doctors with missing fields safely", () => {
    const doctorsWithMissingData = [
      {
        name: "Dr X",
        specialist: "Orthopedic",
      },
    ];

    const result = applyFiltersLogic(
      doctorsWithMissingData,
      { date: "2025-01-13", speciality: "Orthopedic", timing: "10:00" },
      dayNames
    );

    expect(result.filteredDoctors.length).toBe(1);
  });
});
