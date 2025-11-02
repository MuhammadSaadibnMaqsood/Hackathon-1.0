import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

const supabaseURL = "https://lfqwyidepuvnejvliyjj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcXd5aWRlcHV2bmVqdmxpeWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDUyNjIsImV4cCI6MjA3NzU4MTI2Mn0.TG9MKksRb0mFu0hIqlwixt9wl_Prbgu_0JM6ZGQVvgA";

const supabaseCl = createClient(supabaseURL, supabaseAnonKey);

export const getDoctor = async () => {
  const { data, error } = await supabaseCl.from("Doctors").select("*");

  if (error) {
    console.error("Error fetching doctors from Supabase:", error);

    return [];
  }

  //   console.log(data);

  return data;
};

export const getAppoint = async (doctorName, date, time, email) => {
  try {
    const { data, error } = await supabaseCl.from("Appointments").insert({
      DrName: doctorName,
      time: time,
      Date: date,
      PatientEmail: email,
    });
    toast.success("Appointment confirm");
  } catch (error) {
    console.log(error);
  }
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
  

  // return data.reverse();
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
    console.log(error);
    return;
  }
  toast.success("Sign Up successfully");
  window.location.href = "/";
};
export const getLogin = async (email, password) => {
  const { data, error } = await supabaseCl.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log(error);
    return;
  }
  toast.success("Login successfully");
  window.location.href = "/";
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
