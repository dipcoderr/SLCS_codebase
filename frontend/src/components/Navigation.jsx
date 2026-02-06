import React from "react";

const Navigation = ({ text }) => {
  return (
    <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-center text-white text-xl md:text-3xl p-3 md:p-4 mb-6 md:mb-10 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <span>{text}</span>
      </div>
    </header>
  );
};

export default Navigation;
