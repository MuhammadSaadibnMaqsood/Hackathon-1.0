import {
  getAllOppointments,
  getAppoint,
  getSession,
  getDoctor
} from "../config/supabasefunctions";
import { toast } from "react-toastify";


export async function getAppointedFunc(DoctorName, inputs) {
  const { date, timing, note } = inputs;

  if (!date) {
    toast.error("Enter date first");
    return { success: false };
  }
  if (!note) {
    toast.error("select note first");
    return { success: false };
  }

  if (!timing) {
    toast.error("Enter Timing first");
    return { success: false };
  }

  const user = await getSession();

  if (!user?.session?.user?.email) {
    toast.error("Session is missing");
    return { success: false };
  }
  const appointments = await getAllOppointments(DoctorName, date);

  if (appointments.length >= 20) {
    toast.error("No More appointments today");
    return { success: false };
  }

  const isBooked = appointments.some((a) => a.time.substring(0, 5) === timing);

  if (isBooked) {
    toast.error("Time slot already booked");
    return { success: false };
  }

  await getAppoint(DoctorName, date, timing, user.session.user.email,note);

  return { success: true };
}

// GET DATE FUNCTION

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// FILTER LOGIC

export function applyFiltersLogic(doctors, inputs, dayNames) {
  const { date, speciality, timing } = inputs;

  let selectedDay = "";

  if (date) {
    try {
      const dateObj = new Date(date + "T00:00:00");
      selectedDay = dayNames[dateObj.getDay()];
    } catch (e) {}
  }

  if (!date && !speciality && !timing) {
    return {
      filteredDoctors: doctors,
      showResults: false,
    };
  }

  const results = doctors.filter((dr) => {
    let matchesDay = true;
    let matchesSpeciality = true;
    let matchesTiming = true;

    if (selectedDay) {
      const workingDaysArray = dr.workingDays
        ? dr.workingDays.split(",").map((d) => d.trim())
        : [];
      matchesDay = workingDaysArray.includes(selectedDay);
    }

    if (speciality) {
      matchesSpeciality = dr.specialist === speciality;
    }

    if (timing) {
      const [inputHour, inputMinute] = timing.split(":").map(Number);
      const inputMinutes = inputHour * 60 + inputMinute;

      const [startHour] = (dr["shift-start"] || "00:00:00")
        .split(":")
        .map(Number);
      const [endHour] = (dr["shift-end"] || "23:59:59").split(":").map(Number);

      matchesTiming =
        inputMinutes >= startHour * 60 && inputMinutes < endHour * 60;
    }

    return matchesDay && matchesSpeciality && matchesTiming;
  });

  return {
    filteredDoctors: results,
    showResults: true,
  };
}

// GET DOCTOR LOGIC 


export async function fetchDoctorsLogic() {
  try {
    const doctors = await getDoctor();
    return doctors || [];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}
