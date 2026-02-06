import axios from "axios";
import React, { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setUserData } from "../services/store";
import Navigation from "../components/Navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { name, phone, username, password, confirmPassword });
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!name || !phone || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Making registration request...");
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          name,
          phoneNo: phone,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Registration response:", response);
      alert("Registration Successful");

      dispatch(setUserData(response.data.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/complaint");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert("Registration failed: Network error");
      }
    }

    // Clear form fields
    setName("");
    setPhone("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Navigation text="Sign Up" />
      <main className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl">
          <form className="flex flex-col items-center gap-4 mx-10 sm:mx-20 bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="name" className="text-white font-medium">Enter Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="phone" className="text-white font-medium">Enter Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone No."
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="username" className="text-white font-medium">Username</label>
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
              <label htmlFor="password" className="text-white font-medium">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white placeholder-gray-400 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-10 justify-center w-full">
              <Link
                className="text-white hover:text-blue-200 font-medium transition-colors order-3 md:order-1"
                to="/newComplaint"
              >
                Continue as Guest?
              </Link>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-transparent border-2 border-red-500 text-white font-semibold p-3 px-8 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-105 order-1 md:order-2 w-full md:w-auto"
              >
                Sign Up
              </button>
              <Link 
                className="text-white hover:text-blue-200 font-medium transition-colors order-2 md:order-3" 
                to="/login"
              >
                Already Registered?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
