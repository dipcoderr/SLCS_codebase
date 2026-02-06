import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

import { Login, Register, Complaint, NewComplaint, Error } from "./pages";
import Loading from "./pages/Loading";

import Profile from "./pages/Profile";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminComplaints from "./pages/AdminComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";


function App() {
  return (
    <div className="w-full min-h-screen bg-backGround bg-cover bg-fixed bg-no-repeat" style={{ backgroundPosition: 'center 30%' }}>
      <div className="bg-black/30 min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/complaint" element={<AdminComplaints />} />

            <Route
              path="/complaint/:isAdmin/:complaintId"
              element={<ComplaintDetails />}
              />

            <Route path="/profile" element={<Profile />} />

            <Route path="/complaint" element={<Complaint />} />
            <Route path="/newComplaint" element={<NewComplaint />} />

            <Route path="*" element={<Error />} />
            <Route path="*/*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
