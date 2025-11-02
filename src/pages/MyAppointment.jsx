import React, { useEffect, useState } from "react";
import { cancelApp, getAppointments, getSession } from "../config/supabase";
import { CalendarDays, Clock, User, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getAppointmentsFunc();
  }, []);

  async function getAppointmentsFunc() {
    try {
      const user = await getSession();
      const appointment = await getAppointments(user?.session?.user?.email);
      setAppointments(appointment || []);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }
  async function cancelAppointment(id) {
    await cancelApp(id);
    getAppointmentsFunc();
    toast.success("Appointment cancelled");
  }

  return (
    <div className="pageTransition pt-24 md:pt-32 pb-16 px-6 min-h-screen bg-zinc-100 font-sans">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-3">
        My Appointments
      </h1>
      <p className="text-center text-gray-600 mb-12">
        View all your scheduled appointments with our doctors.
      </p>

      {appointments.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-lg mx-auto border border-blue-100">
          <Stethoscope className="mx-auto text-blue-400 w-14 h-14 mb-4" />
          <p className="text-lg text-gray-600">
            You have no appointments yet. Book your first one today!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appointments.reverse().map((appt, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <User className="w-10 h-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {appt.DrName || "Unknown"}
                  </h2>
                </div>
              </div>

              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal-500" />
                  <span>{appt.Date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-500" />
                  <span>{appt.time}</span>
                </div>
              </div>
              <button
                onClick={() => cancelAppointment(appt.id)}
                className="w-full mt-5 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
