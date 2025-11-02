import React, { useState } from "react";
import { getLogin } from "../config/supabase";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.email.trim()) {
      alert("Dont be so smart");
    }
    if (!data.password.trim()) {
      alert("Dont be so smart");
    }
    await getLogin(data.email, data.password);
  }
  return (
    <div className=" pageTransition pt-28 bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Section: Image */}
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-blue-50">
          <img
            src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt="Medical background"
            className="rounded-xl object-cover w-full h-auto max-h-96 md:max-h-full"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
              Welcome back to <span className="text-teal-600">NUXUS</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                required
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
                id="email"
                name="email"
                value={data.email}
                placeholder="saad@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                required
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
            >
              Login
            </button>
          </form>

          {/* Optional: Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
