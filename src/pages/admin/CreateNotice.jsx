
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  LogOut,
  ArrowLeft,
  Send,
} from "lucide-react";

import {
  getStoredNotices,
  saveStoredNotices,
} from "../../data/noticeStorage";

function CreateNotice() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic");
  const [department, setDepartment] = useState("All");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/admin/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const newNotice = {
      id: Date.now(),
      title,
      description,
      content,
      category,
      date,
      department,
      priority,
    };

    const existingNotices = getStoredNotices();

    const updatedNotices = [
      newNotice,
      ...existingNotices,
    ];

    saveStoredNotices(updatedNotices);

    alert("Notice created successfully!");

    navigate("/admin/manage-notices");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-5 flex flex-col">

        <div className="mb-8">
          <h1 className="text-xl font-bold">
            Campus Notice Board
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Admin Portal
          </p>
        </div>

        <nav className="flex flex-col gap-2">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/create-notice"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
          >
            <FilePlus size={18} />
            Create Notice
          </Link>

          <Link
            to="/admin/manage-notices"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <FileText size={18} />
            Manage Notices
          </Link>

          <Link
            to="/admin/departments"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <Users size={18} />
            Departments
          </Link>

        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 md:mt-auto flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-slate-800 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-5 md:p-10">

        <div className="max-w-4xl mx-auto">

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Create New Notice
            </h1>

            <p className="text-slate-500 mt-2">
              Add and publish an announcement for students.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6"
          >

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notice Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Short Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description"
                rows="3"
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Full Content */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Notice Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write complete notice details..."
                rows="5"
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notice Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Event">Event</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Department
                </label>

                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none"
                >
                  <option value="All">All Departments (College-wide)</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>

            </div>

            {/* Date and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notice Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none"
                >
                  <option value="">Normal</option>
                  <option value="New">New</option>
                  <option value="Important">Important</option>
                </select>
              </div>

            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                <Send size={18} />
                Publish Notice
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </main>
    </div>
  );
}

export default CreateNotice;
