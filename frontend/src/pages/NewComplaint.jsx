import Signature from "../components/Signature";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImageStorage } from "../../services/firebaseConfig";
import { v4 } from "uuid";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const types = [
  {
    id: 1,
    name: "INDIVIDUAL",
  },
  {
    id: 2,
    name: "METER",
  },
  {
    id: 3,
    name: "EMERGENCY",
  },
  {
    id: 4,
    name: "AREA",
  },
  {
    id: 5,
    name: "CMHOUSE",
  },
  {
    id: 6,
    name: "STREETLIGHT",
  },
];

export default function NewComplaint() {
  const [signatureTab, setSignatureTab] = useState("");
  const [image, setImage] = useState();
  const [signatureLink, setSignatureLink] = useState();

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"))?.user || null;
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const [location, setLocation] = useState("");
  const [centre, setCentre] = useState("");
  const [category, setCategory] = useState("");
  const [fault, setFault] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [division, setDivision] = useState("");
  const [centrePhone, setCentrePhone] = useState("");
  const [callerPhone, setCallerPhone] = useState(user?.phoneNo || "");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      alternatePhone,
      area,
      address,
      name,
      callerPhone,
      category,
      centre,
      centrePhone,
      division,
      location,
      remarks,
      fault,
      image,
      signatureLink
    });

    // Validate required fields
    if (!alternatePhone || !area || !address || !name || !callerPhone || 
        !category || !centre || !centrePhone || !division || !location || 
        !remarks || !fault) {
      alert("Please fill all required fields");
      return;
    }

    try {
      console.log("Making complaint creation request...");
      const requestData = {
        username: user?.username || null,
        alternatePhone,
        area,
        callerAddress: address,
        callerName: name,
        callerPhone,
        category,
        complainCentre: centre,
        complainCentrePhone: centrePhone,
        division,
        location,
        remarks,
        picture: image || "",
        signature: signatureLink || "",
        typeOfFault: fault,
      };
      
      console.log("Request data:", requestData);
      
      const response = await axios.post(
        "http://localhost:5000/api/v1/complaints/create",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Complaint creation response:", response);
      
      if (response.data.success) {
        alert("Complaint Submitted Successfully");
        navigate("/complaint");
      } else {
        alert("Failed to create complaint");
      }
    } catch (error) {
      console.error("Error creating complaint:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Failed to create complaint: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Failed to create complaint: No response from server");
      } else {
        console.error("Request setup error:", error.message);
        alert("Failed to create complaint: Request error");
      }
    }
  };

  const handleSignatureTab = (e) => {
    e.preventDefault();
    setSignatureTab(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setArea("");
    setLocation("");
    setCentre("");
    setCategory("");
    setFault("");
    setName("");
    setAddress("");
    setDivision("");
    setCentrePhone("");
    setCallerPhone("");
    setAlternatePhone("");
    setRemarks("");
    setImage("");
    setSignatureLink("");
  };

  const handleImage = (e) => {
    const imageUploaded = e.target.files[0];

    const imgRef = ref(ImageStorage, `images/${v4()}`);
    uploadBytes(imgRef, imageUploaded).then((snapshot) => {
      // console.log("Uploaded a blob or file!", snapshot);
      setImage(snapshot.metadata.fullPath);
      // console.log('image:', image);
    });
    // console.log('imgRef: ', imgRef);
  };

  return (
    <>
      <Link to={"/"}>
        <Navigation text="Street Light Complaint" />
      </Link>
      <main className="mx-2 md:mx-auto md:max-w-4xl lg:max-w-6xl overflow-y-auto min-h-[calc(100vh-120px)]">
        <div className="text-xl md:text-2xl font-bold text-center mx-4 md:mx-10 text-red-500 border py-4 mb-8 rounded-lg bg-black/30 backdrop-blur-sm">
          New Complaint Page
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-lg mx-2 md:mx-4 p-4 md:p-8">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="area" className="text-blue-400 font-medium">
                Area
              </label>
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter Area"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="centre" className="text-blue-400 font-medium">
                Complaint Centre
              </label>
              <input
                type="text"
                id="centre"
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                placeholder="Enter Complaint Centre"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="category" className="text-blue-400 font-medium">
                Complaint Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="fault" className="text-blue-400 font-medium">
                Type of Fault
              </label>
              <select
                type="text"
                id="fault"
                value={fault}
                onChange={(e) => setFault(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              >
                <option value="" className="bg-black/80 text-white">
                  Select Fault Type
                </option>
                {types.map((type) => (
                  <option value={type.name} className="bg-black/90 text-white" key={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="name" className="text-blue-400 font-medium">
                Caller Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="address" className="text-blue-400 font-medium">
                Caller Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="division" className="text-blue-400 font-medium">
                Division
              </label>
              <input
                type="text"
                id="division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                placeholder="Enter Division"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="centrePhone" className="text-blue-400 font-medium">
                Complaint Center Phone
              </label>
              <input
                type="text"
                id="centrePhone"
                value={centrePhone}
                onChange={(e) => setCentrePhone(e.target.value)}
                placeholder="Enter Center Phone Number"
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="callerPhone" className="text-blue-400 font-medium">
                Caller Phone
              </label>
              <input
                type="text"
                id="callerPhone"
                value={callerPhone}
                onChange={(e) => setCallerPhone(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="alternatePhone" className="text-blue-400 font-medium">
                Alternate Phone
              </label>
              <input
                type="text"
                id="alternatePhone"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="location" className="text-blue-400 font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 w-full lg:col-span-2">
              <label htmlFor="remarks" className="text-blue-400 font-medium">
                Remarks
              </label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="p-3 border-b-2 w-full bg-transparent border-gray-500 text-white text-lg focus:border-blue-400 transition-colors resize-none h-20"
                required
              />
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 pb-10">
              <div className="flex relative border-2 border-red-500 rounded-lg hover:bg-red-500 transition-all duration-300">
                <span className="w-full h-full p-3 font-semibold flex justify-center items-center text-white text-center">
                  Upload Image
                </span>
                <input
                  type="file"
                  onChange={handleImage}
                  className="absolute opacity-0 block bg-transparent top-0 w-full h-full cursor-pointer"
                  required
                />
              </div>
              
              <button
                onClick={handleSignatureTab}
                className="bg-transparent border-2 border-red-500 p-3 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300 text-white font-semibold"
              >
                Signature
              </button>
              
              <button
                type="submit"
                onClick={handleRegister}
                className="bg-transparent border-2 border-green-500 p-3 rounded-lg hover:bg-green-600 hover:border-green-600 transition-all duration-300 text-white font-semibold"
              >
                Register
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="bg-transparent border-2 border-yellow-500 p-3 rounded-lg hover:bg-yellow-600 hover:border-yellow-600 transition-all duration-300 text-white font-semibold"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        
        {signatureTab && (
          <Signature
            setSignatureLink={setSignatureLink}
            onClose={() => setSignatureTab(false)}
          />
        )}
      </main>
    </>
  );
}
