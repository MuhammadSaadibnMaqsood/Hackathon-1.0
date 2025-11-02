import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import GetAppointment from "./pages/GetAppointment";
import MyAppointment from "./pages/MyAppointment";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import { getSession } from "./config/supabase";
import About from "./pages/About";
function App() {
  const [user, setUser] = useState([]);
  async function getUser() {
    const user = await getSession();
    console.log(user);
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user?.session ? <Home /> : <Login />} />
        <Route path="/signup" element={user?.session ? <Home /> : <SignUp />} />
        <Route
          path="/getappointment"
          element={user?.session ? <GetAppointment /> : <Login />}
        />
        <Route
          path="/myappointment"
          element={user?.session ? <MyAppointment /> : <Login />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
