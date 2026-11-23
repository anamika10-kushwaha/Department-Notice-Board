import AllNotices from "./pages/student/AllNotices";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/student/Profile";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import DepartmentNotices from "./pages/student/DepartmentNotices";
import NoticeDetails from "./pages/student/NoticeDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/student/notices" element={<AllNotices />} />
        <Route
  path="/student/department"
  element={<DepartmentNotices />}
/>

<Route
  path="/student/notices/:id"
  element={<NoticeDetails />}
/>
<Route path="/student/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
