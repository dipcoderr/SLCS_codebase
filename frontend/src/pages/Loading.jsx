import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {
    console.log("Redirecting to login");
    navigate("/login");
  }, 2000);
  return (
    <>
      <Navigation text="Street Light Complaint" />
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="text-center">
          <img
            src="/assets/slcs_logo.png"
            className="rounded-full w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-8 shadow-2xl"
            alt="logo"
          />
          <div className="text-white text-xl md:text-2xl font-semibold animate-pulse">
            Loading...
          </div>
        </div>
      </main>
    </>
  );
}

export default Loading;
