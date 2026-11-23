
import { useState } from "react";
import { notices } from "../../data/notices";
import { CalendarDays, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";

function DepartmentNotices() {
  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const department = student?.department || "CSE";

  const [search, setSearch] = useState("");

  const departmentNotices = notices.filter(
    (notice) => notice.department === department
  );

  const filteredNotices = departmentNotices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-sm text-slate-500">
            Student Portal / Department
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            {department} Department Notices
          </h1>

          <p className="text-slate-500 mt-2">
            Announcements specifically for your department.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search department notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <p className="text-slate-500 mb-4">
          {filteredNotices.length} department notices found
        </p>

        {/* Notices */}
        <div className="grid gap-4">
          {filteredNotices.map((notice) => (
            <Link
              to={`/student/notices/${notice.id}`}
              key={notice.id}
              className="block bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full">
                  {notice.category}
                </span>

                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                  {notice.department}
                </span>
              </div>

              <h2 className="font-semibold text-lg text-slate-800">
                {notice.title}
              </h2>

              <p className="text-slate-500 text-sm mt-2">
                {notice.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                <CalendarDays size={15} />
                {notice.date}
              </div>
            </Link>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="bg-white p-10 rounded-2xl text-center border border-slate-200">
            <FileText size={35} className="mx-auto text-slate-400" />
            <h3 className="font-semibold mt-3 text-slate-700">
              No department notices found
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentNotices;
