import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import axios from "axios";
import ComplaintImages from "../components/ComplaintImages";

const ComplaintDetails = () => {
  const { isAdmin, complaintId } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({});
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        console.log("Fetching complaint with ID:", complaintId);
        const response = await axios.get(`http://localhost:5000/api/v1/complaints/${complaintId}`);
        console.log("Complaint response:", response.data);
        setComplaint(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint:", error);
        setLoading(false);
      }
    };

    if (complaintId) {
      fetchComplaint();
    }
  }, [complaintId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      alert("Please select a status");
      return;
    }
    
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/complaints/${complaintId}`, {
        status,
        remarks,
      });
      console.log("Update response:", response);
      alert("Complaint updated successfully");
      navigate("/admin/complaint");
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update complaint");
    }
  };

  const handleBack = () => {
    if (isAdmin === "admin") {
      navigate("/admin/complaint");
    } else {
      navigate("/complaint");
    }
  };

  if (loading) {
    return (
      <div>
        <Navigation text="Complaint Details" />
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation text="Complaint Details" />
      <main className="min-h-[calc(100vh-120px)] overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-blue-200 mb-6 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Complaints
          </button>

          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl mb-8 font-semibold text-white text-center">
              Complaint Details
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Complaint Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Complaint Information</h2>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Fault:</span>
                    <span className="text-white">{complaint.typeOfFault || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Category:</span>
                    <span className="text-white">{complaint.category || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Location:</span>
                    <span className="text-white">{complaint.location || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Remarks:</span>
                    <span className="text-white">{complaint.remarks || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Area:</span>
                    <span className="text-white">{complaint.area || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Centre:</span>
                    <span className="text-white">{complaint.complainCentre || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Division:</span>
                    <span className="text-white">{complaint.division || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Status:</span>
                    <span className={`font-semibold capitalize ${
                      complaint.status === 'approved' ? 'text-green-400' :
                      complaint.status === 'deny' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {complaint.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Date:</span>
                    <span className="text-white">{complaint.createdAt?.split("T")[0] || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Time:</span>
                    <span className="text-white">
                      {complaint.createdAt?.split("T")[1]?.split(".")[0] || 'N/A'} IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Customer Details</h2>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Name:</span>
                    <span className="text-white">{complaint.callerName || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Address:</span>
                    <span className="text-white">{complaint.callerAddress || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Phone:</span>
                    <span className="text-white">{complaint.callerPhone || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Alt Phone:</span>
                    <span className="text-white">{complaint.alternatePhone || 'N/A'}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 min-w-[120px]">Centre Phone:</span>
                    <span className="text-white">{complaint.complainCentrePhone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Images and Signature */}
            <div className="mt-8">
              <ComplaintImages complaint={complaint} />
            </div>

            {/* Admin Actions */}
            {complaint.status === "pending" && isAdmin === "admin" && (
              <div className="mt-8 bg-black/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">Admin Actions</h2>
                
                <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label htmlFor="status" className="block text-blue-200 font-medium mb-2">
                      Update Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={status}
                      className="w-full p-3 border-b-2 bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option className="bg-black/90 text-white" value="">
                        Select Status
                      </option>
                      <option className="bg-black/90 text-white" value="approved">
                        Approve
                      </option>
                      <option className="bg-black/90 text-white" value="deny">
                        Deny
                      </option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="remarks" className="block text-blue-200 font-medium mb-2">
                      Admin Remarks
                    </label>
                    <textarea
                      id="remarks"
                      placeholder="Enter your remarks..."
                      className="w-full p-3 border-b-2 bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors resize-none h-24 placeholder-gray-400"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors hover:scale-105 transform duration-300"
                  >
                    Update Complaint
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintDetails;
