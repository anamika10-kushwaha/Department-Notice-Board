import AllNotices from "./pages/student/AllNotices";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/student/Profile";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import DepartmentNotices from "./pages/student/DepartmentNotices";
import AdminLogin from "./pages/admin/AdminLogin";
import NoticeDetails from "./pages/student/NoticeDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateNotice from "./pages/admin/CreateNotice";
import ManageNotices from "./pages/admin/ManageNotices";
import EditNotice from "./pages/admin/EditNotice";
import Departments from "./pages/admin/Departments";
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
<Route path="/admin/login" element={<AdminLogin />} />
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/create-notice"
  element={<CreateNotice />}
/>
<Route
  path="/admin/manage-notices"
  element={<ManageNotices />}
/>
<Route
  path="/admin/edit-notice/:id"
  element={<EditNotice />}
/>  
<Route
  path="/admin/departments"
  element={<Departments />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;