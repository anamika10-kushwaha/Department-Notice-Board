
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/auth/signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/student/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
