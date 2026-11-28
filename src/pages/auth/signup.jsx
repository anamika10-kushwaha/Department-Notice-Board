import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const students = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    const existingStudent = students.find(
      (student) => student.email === formData.email
    );

    if (existingStudent) {
      alert("This email is already registered!");
      return;
    }

    students.push(formData);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Header */}
      <Header />

      {/* Signup Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-2xl font-bold text-slate-800 text-center">
            Create Student Account
          </h1>

          <p className="text-slate-500 text-center mt-2 mb-6">
            Join your department's digital notice board
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                required
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Academic Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Signup;