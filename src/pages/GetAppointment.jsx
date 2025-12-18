import React, { useEffect, useState } from "react";
import {
  getAllOppointments,
  getAppoint,
  getDoctor,
  getSession,
} from "../config/supabase";
import { Search, Clock, Calendar, ChevronDown, User } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const GetAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    date: "",
    speciality: "",
    timing: "",
  });
  const [filteredDr, setFilteredDr] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  useEffect(() => {
    setDoctorsFunc();
  }, []);

  async function setDoctorsFunc() {
    try {
      setLoading(true);
      const dr = await getDoctor();
      if (dr && dr.length > 0) {
        setDoctors(dr);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
      applyFilters();
    }
  }

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

  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [inputs, doctors, loading]);

  if (loading) {
    return <Loader />;
  }

  let currentDay = "";
  if (inputs.date) {
    try {
      const dateObj = new Date(inputs.date + "T00:00:00");
      currentDay = dayNames[dateObj.getDay()];
    } catch (e) {}
  }

  async function getAppointed(DoctorName) {
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

  return (
    <div className="pt-24 pageTransition md:pt-32 px-4 md:px-8 max-w-7xl mx-auto min-h-screen bg-zinc-100 font-sans">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-2">
        Book an Appointment
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Find the right specialist at the time that works for you.
      </p>

      {/* Appointment Filters Form */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-end">
          {/* Date Selector */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              Select Date
              {currentDay && (
                <span className="text-xs text-blue-500">({currentDay})</span>
              )}
            </label>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              value={inputs.date}
              min={getTodayDate()} // Add this line
              className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Speciality Selector */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-600" />
              Select Speciality
            </label>
            <div className="relative">
              <select
                onChange={handleInputChange}
                name="speciality"
                value={inputs.speciality}
                className="w-full appearance-none p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
              >
                <option value="">Any Speciality</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Dentist">Dentist</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>

          {/* Time Input */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              Select Time Slot
            </label>
            <input
              type="time"
              name="timing"
              onChange={handleInputChange}
              value={inputs.timing}
              className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Doctor Results List */}
      {showResults && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Available Doctors ({filteredDr.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDr.length > 0 ? (
              filteredDr.map((dr, index) => (
                <div
                  key={dr.id || index}
                  className="bg-white p-5 rounded-xl shadow-lg border border-teal-100 flex flex-col items-start hover:shadow-2xl transition duration-300"
                >
                  {/* Profile Image */}
                  {dr.ProfileImg ? (
                    <img
                      src={dr.ProfileImg}
                      alt={`Dr. ${dr.DoctorName}`}
                      className="w-16 h-16 rounded-full object-cover mb-3 shadow-md border-2 border-blue-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/64x64/93C5FD/ffffff?text=DR";
                      }}
                    />
                  ) : (
                    <User className="w-10 h-10 p-1 bg-blue-100 rounded-full text-blue-600 mb-3" />
                  )}

                  <h3 className="text-xl font-bold text-gray-800">
                    {dr.DoctorName || `Doctor ${index + 1}`}
                  </h3>
                  <p className="text-teal-600 font-medium mb-3">
                    {dr.specialist}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    Available on:{" "}
                    <span className="font-semibold text-gray-700 block">
                      {dr.workingDays}
                    </span>
                    <span className="block text-xs mt-1 text-gray-600">
                      Shift: {dr["shift-start"].substring(0, 5)} -{" "}
                      {dr["shift-end"].substring(0, 5)}
                    </span>
                  </p>
                  <button
                    onClick={() => getAppointed(dr.DoctorName)}
                    className="w-full cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
                  >
                    Get Appointment
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500 p-8 bg-white rounded-lg shadow">
                No doctors found matching the selected criteria. Please try a
                different selection.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAppointment;
