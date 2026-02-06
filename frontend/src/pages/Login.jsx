import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";
import Navigation from "../components/Navigation";

export default function Login() {
  const [username, setUsername] = useState("");
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
    console.log("Login attempt with:", { username, password: "***" });
    
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Making login request...");
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          username,
          password,
        }
      );
      
      console.log("Login response:", response);
      alert("Login Successful");
      dispatch(setUserData(response.data.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/complaint");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
      } else {
        alert("Login failed: Network error");
      }
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <Navigation text="Login" />

      <main className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl">
          <form className="flex flex-col items-center gap-4 mx-10 sm:mx-20 bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col gap-3 w-full ">
              <label htmlFor="username" className="text-white font-medium">Enter Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
                Login
              </button>
              <Link
                className="text-white hover:text-blue-200 font-semibold transition-all duration-300 hover:scale-110"
                to="/register"
              >
                New User?
              </Link>
              <Link
                className="text-white border border-white p-3 px-6 rounded-lg hover:bg-blue-900 hover:text-white font-semibold transition-all duration-300 w-full md:w-auto text-center"
                to="/admin/login"
              >
                Admin Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
