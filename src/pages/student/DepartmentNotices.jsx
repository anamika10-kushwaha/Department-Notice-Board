
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredNotices } from "../../data/noticeStorage";
import StudentSidebar from "../../components/student/StudentSidebar";

import {
  Search,
  CalendarDays,
  FileText,
} from "lucide-react";

function DepartmentNotices() {
  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const department = student?.department || "CSE";

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadNotices = () => {
      setNotices(getStoredNotices());
    };

    loadNotices();

    window.addEventListener("storage", loadNotices);

    return () => {
      window.removeEventListener("storage", loadNotices);
    };
  }, []);

  // Only show notices belonging to the student's department
  const departmentNotices = notices.filter(
    (notice) => notice.department === department
  );

  // Apply search filter
  const filteredNotices = departmentNotices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      <StudentSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">
            <p className="text-sm text-slate-500">
              Student Portal / Department
            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-2">
              {department} Department Notices
            </h1>

            <p className="text-slate-500 mt-2">
              View all announcements and updates from your department.
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search department notices..."
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Notice Count */}
          <div className="flex items-center gap-2 text-slate-500 mb-4">
            <FileText size={18} />
            <p>{filteredNotices.length} department notices found</p>
          </div>

          {/* Notices List */}
          <div className="grid gap-4">
            {filteredNotices.map((notice) => (
              <Link
                to={`/student/notices/${notice.id}`}
                key={notice.id}
                className="block bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                    {notice.category}
                  </span>

                  <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                    {notice.department}
                  </span>

                  {notice.priority && (
                    <span className="bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full">
                      {notice.priority}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-semibold text-slate-800">
                  {notice.title}
                </h2>

                <p className="text-slate-500 text-sm leading-6 mt-2">
                  {notice.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                  <CalendarDays size={15} />
                  {notice.date}
                </div>
              </Link>
            ))}

            {filteredNotices.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <FileText
                  className="mx-auto text-slate-400 mb-3"
                  size={36}
                />

                <h3 className="font-semibold text-slate-700">
                  No department notices found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your department notices will appear here when published.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default DepartmentNotices;
