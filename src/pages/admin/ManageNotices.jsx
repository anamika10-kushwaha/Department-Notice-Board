
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  LogOut,
  Search,
  Edit,
  Trash2,
  CalendarDays,
  Building2,
} from "lucide-react";

import {
  getStoredNotices,
  saveStoredNotices,
} from "../../data/noticeStorage";

function ManageNotices() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedDepartment = searchParams.get("department");

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    setNotices(getStoredNotices());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/admin/login");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const updatedNotices = notices.filter(
      (notice) => notice.id !== id
    );

    setNotices(updatedNotices);
    saveStoredNotices(updatedNotices);
  };

  // Apply department, search and category filters
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const activeDepartment = selectedDepartment || departmentFilter;

    const matchesDepartment =
      activeDepartment === "All" ||
      notice.department === activeDepartment;

    const matchesCategory =
      categoryFilter === "All" ||
      notice.category === categoryFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesCategory
    );
  });

  const pageTitle = selectedDepartment
    ? `${selectedDepartment} Department Notices`
    : "Manage Notices";

  const pageDescription = selectedDepartment
    ? `View and manage all notices published for the ${selectedDepartment} department.`
    : "View, edit and delete college notices.";

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

        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {pageTitle}
              </h1>

              <p className="text-slate-500 mt-2">
                {pageDescription}
              </p>
            </div>

            <Link
              to="/admin/create-notice"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
            >
              + Create Notice
            </Link>

          </div>

          {/* Filters */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notices..."
                  className="w-full border border-slate-300 rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment || departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                disabled={Boolean(selectedDepartment)}
                className="border border-slate-300 rounded-xl p-3 outline-none disabled:bg-slate-100 disabled:text-slate-500"
              >
                <option value="All">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-slate-300 rounded-xl p-3 outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Workshop">Workshop</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
              </select>

            </div>
          </div>

          {/* Notice Count */}
          <p className="text-sm text-slate-500 mb-4">
            Showing {filteredNotices.length} of {notices.length} notices
          </p>

          {/* Notices List */}
          <div className="space-y-4">

            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="flex-1">

                      <div className="flex flex-wrap gap-2 mb-3">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {notice.category}
                        </span>

                        {notice.priority && (
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                            {notice.priority}
                          </span>
                        )}

                      </div>

                      <h2 className="text-lg font-bold text-slate-800">
                        {notice.title}
                      </h2>

                      <p className="text-sm text-slate-500 mt-2">
                        {notice.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <CalendarDays size={15} />
                          {notice.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <Building2 size={15} />
                          {notice.department === "All"
                            ? "All Departments"
                            : notice.department}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">

                      <Link
                        to={`/admin/edit-notice/${notice.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      >
                        <Edit size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">

                <FileText
                  size={40}
                  className="mx-auto text-slate-400 mb-3"
                />

                <h3 className="text-lg font-semibold text-slate-700">
                  No Notices Found
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  {selectedDepartment
                    ? `There are no notices for the ${selectedDepartment} department yet.`
                    : "Try changing your search or filters."}
                </p>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default ManageNotices;
