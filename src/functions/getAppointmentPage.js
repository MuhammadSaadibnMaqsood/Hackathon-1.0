import { getAppoint } from "../config/supabasefunctions";

export async function getAppointedFunc(DoctorName) {
  const { date, timing } = inputs;

  if (!date) {
    toast.error("Enter date first");
    return;
  }
  if (!timing) {
    toast.error("Enter Timing first");
    return;
  }

  const user = await getSession();

  const data = await getAllOppointments(DoctorName, date);

  if (data.length >= 20) {
    toast.error("No More appointments today");
    return;
  }

  const isBooked = data.some((appointment) => {
    const dbTime = appointment.time.substring(0, 5);
    return dbTime === timing;
  });
  if (isBooked) {
    toast.error("Time slot already booked");
    return;
  }

  await getAppoint(DoctorName, date, timing, user.session.user.email);
}

//FILTERS FUNCTION

  const applyFilters = (currentDoctors = doctors) => {
    const { date, speciality, timing } = inputs;

    let selectedDay = "";
    if (date) {
      try {
        const dateObj = new Date(date + "T00:00:00");

        selectedDay = dayNames[dateObj.getDay()];
      } catch (e) {
        console.error("Invalid date selected", e);
      }
    }

    if (!date && !speciality && !timing) {
      setFilteredDr(currentDoctors);
      setShowResults(false);
      return;
    }

    setShowResults(true);

    const results = currentDoctors.filter((dr) => {
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
        const [endHour] = (dr["shift-end"] || "23:59:59")
          .split(":")
          .map(Number);

        const startMinutes = startHour * 60;
        const endMinutes = endHour * 60;

        matchesTiming =
          inputMinutes >= startMinutes && inputMinutes < endMinutes;
      }

      return matchesDay && matchesSpeciality && matchesTiming;
    });

    setFilteredDr(results);
  };