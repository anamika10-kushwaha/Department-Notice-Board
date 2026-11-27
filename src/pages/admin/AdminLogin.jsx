
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo credentials for frontend testing
    if (
      email === "admin@college.com" &&
      password === "admin123"
    ) {
      const admin = {
        email: email,
        role: "admin",
      };

      localStorage.setItem(
        "loggedInAdmin",
        JSON.stringify(admin)
      );

      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-2xl mb-4">
            <ShieldCheck size={35} className="text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Admin Login
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Sign in to manage college notices
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Admin Email
            </label>

            <div className="flex items-center border border-slate-300 rounded-xl px-3">
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
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
                placeholder="Enter password"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login as Admin
          </button>

        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Login as Student instead
          </Link>
        </div>

        <div className="mt-6 bg-slate-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-slate-700">
            Demo Admin Credentials
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Email: admin@college.com
          </p>
          <p className="text-sm text-slate-500">
            Password: admin123
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
