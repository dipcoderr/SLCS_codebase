import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";
import Navigation from "../components/Navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("user"));
  // console.log('token', token);

  useEffect(() => {
    if (token) {
      const logout = window.confirm("Are you sure you want to logout?");

      if (logout) {
        sessionStorage.removeItem("user");
        dispatch(resetUserData());
      } else {
        navigate("/complaint");
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Admin login attempt with:", { email, password: "***" });
    
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Making admin login request...");
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        {
          email,
          password,
        }
      );
      
      console.log("Admin login response:", response);
      alert("Login Successful");
      dispatch(setUserData(response.data.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/admin/complaint");
    } catch (error) {
      console.error("Admin login error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
      } else {
        alert("Login failed: Network error");
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Navigation text="Admin Login" />

      <main className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl">
          <form className="flex flex-col items-center gap-4 mx-10 sm:mx-20 bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="email" className="text-white font-medium">Enter Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="password" className="text-white font-medium">Enter Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-6 mt-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-red-500 border-2 text-white font-semibold border-red-500 p-3 px-8 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-105 w-full md:w-auto"
              >
                Admin Login
              </button>
              <Link
                className="text-white hover:text-blue-200 font-medium transition-colors"
                to="/login"
              >
                User Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminLogin;
