//a notice having department "all" will not appear in anyone of the department section it will appear in managenotices page or all notices page in student.
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  LogOut,
  Building2,
  ArrowRight,
} from "lucide-react";

function Departments() {
  const navigate = useNavigate();

  const departments = [
    {
      code: "CSE",
      name: "Computer Science and Engineering",
      description:
        "Notices related to programming, software, technology and academics.",
    },
    {
      code: "IT",
      name: "Information Technology",
      description:
        "Notices related to information technology, networking and academics.",
    },
    {
      code: "ECE",
      name: "Electronics and Communication Engineering",
      description:
        "Notices related to electronics, communication and department activities.",
    },
    {
      code: "Mechanical",
      name: "Mechanical Engineering",
      description:
        "Notices related to mechanical engineering and department activities.",
    },
    {
      code: "Civil",
      name: "Civil Engineering",
      description:
        "Notices related to construction, infrastructure and academics.",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/admin/login");
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
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

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Departments
            </h1>

            <p className="text-slate-500 mt-2">
              Select a department to view and manage its notices.
            </p>
          </div>

          {/* Department Count */}
          <div className="bg-blue-600 text-white p-6 rounded-2xl mb-8">

            <div className="flex items-center gap-4">

              <div className="bg-white/20 p-3 rounded-xl">
                <Building2 size={28} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {departments.length}
                </h2>

                <p className="text-blue-100">
                  Total Departments
                </p>
              </div>

            </div>
          </div>

          {/* Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {departments.map((department) => (
              <div
                key={department.code}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Building2
                      size={25}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {department.code}
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-800">
                  {department.name}
                </h3>

                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  {department.description}
                </p>

                <Link
                  to={`/admin/manage-notices?department=${encodeURIComponent(department.code)}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mt-6 hover:gap-3 transition-all"
                >
                  View Department Notices
                  <ArrowRight size={16} />
                </Link>

              </div>
            ))}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Departments;
