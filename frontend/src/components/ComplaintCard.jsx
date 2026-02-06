import React from "react";
import { Link } from "react-router-dom";

const ComplaintCard = ({ complaint, type }, {key}) => {
  // console.log('isAdmin: ', type);
  
  return (
    <Link
      key={key}
      to={`/complaint/${type}/${complaint._id}`}
      className={`flex flex-col items-start w-full max-w-sm mx-auto h-auto min-h-[200px] gap-2 text-white hover:scale-105 p-6 rounded-xl ${
        complaint.status === "pending" && "bg-zinc-400/35"
      } ${complaint.status === "deny" && "bg-red-400/35"} ${
        complaint.status === "approved" && "bg-green-400/35"
      } transition-all hover:text-white/80 backdrop-blur-sm border border-white/10 shadow-lg`}
    >
      <h2 className="text-lg md:text-xl font-bold">
        <span className="text-blue-300">Category:</span> {complaint.category}
      </h2>
      <p className="text-base md:text-lg">
        <span className="text-blue-300">Faults:</span> {complaint.typeOfFault}
      </p>
      <p className="text-sm md:text-base">
        <span className="text-blue-300">Location:</span> {complaint.location}
      </p>
      <p className="text-sm md:text-base capitalize text-yellow-200 font-semibold">
        <span className="text-blue-300">Status:</span> {complaint.status}
      </p>
      <p className="text-sm md:text-base text-green-300 font-semibold">
        <span className="text-blue-300">By:</span> {complaint.callerName}
      </p>
      <p className="text-xs md:text-sm justify-end flex w-full text-gray-300 mt-auto">
        <span className="text-blue-300">Date:</span> {complaint.createdAt.split("T")[0]}
      </p>
    </Link>
  );
};

export default ComplaintCard;
