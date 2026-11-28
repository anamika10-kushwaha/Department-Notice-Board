
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const students = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    const student = students.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (student) {
      localStorage.setItem(
        "loggedInStudent",
        JSON.stringify(student)
      );

      navigate("/student/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn size={30} className="text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Student Login
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Login to access your department notice board
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-slate-300 rounded-xl px-3">
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <div className="flex items-center border border-slate-300 rounded-xl px-3">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Admin Login Link */}
        <div className="border-t border-slate-200 mt-6 pt-5 text-center">
          <p className="text-sm text-slate-500 mb-2">
            Are you an administrator?
          </p>

          <Link
            to="/admin/login"
            className="text-blue-600 font-semibold text-sm hover:underline"
          >
            Login as Admin
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
