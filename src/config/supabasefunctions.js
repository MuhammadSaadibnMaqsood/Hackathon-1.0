import { toast } from "react-toastify";
import { supabaseCl } from "./supabaseClient";

export const getDoctor = async () => {
  const { data, error } = await supabaseCl.from("Doctors").select("*");

  if (error) {
    console.error("Error fetching doctors from Supabase:", error);

    return [];
  }

  return data;
};

export const getAppoint = async (doctorName, date, time, email, note) => {
  try {
    const { data, error } = await supabaseCl.from("Appointments").insert({
      DrName: doctorName,
      time: time,
      Date: date,
      PatientEmail: email,
      note: note,
    });
    toast.success("Appointment confirm");
  } catch (error) {
    console.log(error);
  }
};

export const getAllOppointments = async (doctorName, date) => {
  const { data, error } = await supabaseCl
    .from("Appointments")
    .select("*")
    .eq("DrName", doctorName)
    .eq("Date", date);

  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
  return data;
};
export const getAppointments = async (email) => {
  const { data, error } = await supabaseCl
    .from("Appointments")
    .select()
    .eq("PatientEmail", email);

  if (error) {
    console.log(error);
    return;
  }
  return data.reverse();
};
export const cancelApp = async (id) => {
  const { data, error } = await supabaseCl
    .from("Appointments")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabaseCl.auth.getSession();
    if (data) {
      return data;
    } else {
      console.log(error);
    }
  } catch (error) {}
};

export const getSignup = async (email, password) => {
  const { data, error } = await supabaseCl.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, user: data.user };
};
export const getLogin = async (email, password) => {
  const { data, error } = await supabaseCl.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, user: data.user };
};

export const logout = async () => {
  const { error } = await supabaseCl.auth.signOut();
  if (error) {
    console.log(error);
    return;
  }
  toast.success("Logout successfully");

  window.location.href = "/";
};
