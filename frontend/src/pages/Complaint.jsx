import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavWithProfile from "../components/NavWithProfile";
import ComplaintCard from "../components/ComplaintCard";

function Complaint() {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  // console.log("user", user);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState();

  const handleComplaint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/complaints/user/${user.user.username}`
      );
      // console.log("response", response);

      setComplaints(response.data.data);
      
    } catch (error) {
      // alert("Error", error);
      console.log("No user found", error);
    }
  };

  useEffect(() => {
    if (user) handleComplaint();
  }, []);

  return (
    <>
      <NavWithProfile text="All Complaints" />
      <main className="min-h-[calc(100vh-120px)] overflow-y-auto text-center px-4">
        <div className="max-w-7xl mx-auto">
          {/* file new complaint */}
          <div className="flex justify-center items-end mt-4 mb-8">
            <Link 
              to="/newComplaint" 
              className="text-red-500 hover:text-red-400 font-bold text-lg md:text-xl transition-colors bg-black/30 px-6 py-3 rounded-lg backdrop-blur-sm hover:scale-105 transform duration-300"
            >
              File new complaint !
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
            {Array.isArray(complaints) &&
              complaints.map((complaint, index) => (
                <ComplaintCard complaint={complaint} key={index} type="user" />
              ))}
          </div>

          {(!complaints || complaints.length === 0) && (
            <div className="text-white text-lg mt-20 bg-black/30 p-8 rounded-lg backdrop-blur-sm">
              <p>No complaints found. File your first complaint!</p>
            </div>
          )}

          <button
            onClick={() => {
              sessionStorage.removeItem("user");
              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 mt-6 text-white px-6 py-3 rounded-lg mb-10 font-semibold transition-colors hover:scale-105 transform duration-300"
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
}

export default Complaint;
