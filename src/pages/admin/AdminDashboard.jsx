import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <Header />

      <div className="flex flex-1 flex-col md:flex-row">

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
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
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
        <main className="flex-1 min-w-0 p-6 md:p-10">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome to the College Notice Board Administration Panel.
            </p>
          </div>

          {/* Welcome Card */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold">
              Welcome, Administrator!
            </h2>

            <p className="mt-2 text-blue-100">
              Manage college announcements and department-wise notices from one place.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                <FilePlus className="text-blue-600" size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Create Notice
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Publish new notices for a department or the entire college.
              </p>

              <Link
                to="/admin/create-notice"
                className="inline-block mt-5 text-blue-600 font-semibold text-sm"
              >
                Create Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">
                <FileText className="text-green-600" size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Manage Notices
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                View, edit and delete published notices.
              </p>

              <Link
                to="/admin/manage-notices"
                className="inline-block mt-5 text-blue-600 font-semibold text-sm"
              >
                Manage Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
                <Users className="text-purple-600" size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Departments
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                View the departments available on the notice board.
              </p>

              <Link
                to="/admin/departments"
                className="inline-block mt-5 text-blue-600 font-semibold text-sm"
              >
                View Departments →
              </Link>
            </div>

          </div>

        </main>
      </div>

      <Footer />

    </div>
  );
}

export default AdminDashboard;