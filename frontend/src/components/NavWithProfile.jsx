import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const NavWithProfile = ({ text }) => {
  return (
    <header className="sticky text-center left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-xl md:text-3xl p-3 md:p-4 mb-6 md:mb-10 flex justify-center items-center shadow-lg">
      <div className="max-w-7xl mx-auto w-full relative flex justify-center items-center">
        <span className="truncate px-16">{text}</span>
        <Link
          to="/profile"
          className="absolute right-2 md:right-4 flex items-center text-white hover:text-white group"
        >
          <img
            src="/assets/profile-image.jpg"
            alt="profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
          <ChevronDown className="w-4 h-4 md:w-6 md:h-6 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
        </Link>
      </div>
    </header>
  );
};

export default NavWithProfile;
