
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredNotices } from "../../data/noticeStorage";
import StudentSidebar from "../../components/student/StudentSidebar";

import {
  Search,
  CalendarDays,
  FileText,
} from "lucide-react";

function AllNotices() {
  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const department = student?.department || "CSE";

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  // Department notices + college-wide notices
  const availableNotices = notices.filter(
    (notice) =>
      notice.department === department ||
      notice.department === "All"
  );

  // Apply search and category filters
  const filteredNotices = availableNotices.filter((notice) => {
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || notice.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      <StudentSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">
            <p className="text-sm text-slate-500">
              Student Portal / Notices
            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-2">
              All Notices
            </h1>

            <p className="text-slate-500 mt-2">
              Browse college-wide and {department} department notices.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notices by title..."
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Examination">Examination</option>
              <option value="Workshop">Workshop</option>
              <option value="Academic">Academic</option>
              <option value="General">General</option>
              <option value="Event">Event</option>
            </select>
          </div>

          {/* Notice Count */}
          <div className="flex items-center gap-2 text-slate-500 mb-4">
            <FileText size={18} />
            <p>{filteredNotices.length} notices found</p>
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
                    {notice.department === "All"
                      ? "College-wide"
                      : notice.department}
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
                  No notices found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Try changing your search or category.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default AllNotices;
