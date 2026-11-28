import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredNotices } from "../../data/noticeStorage";
import StudentSidebar from "../../components/student/StudentSidebar";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import {
  FileText,
  BookOpen,
  CalendarDays,
  ArrowRight,
  Bell,
  UserRound,
} from "lucide-react";

function Dashboard() {
  const [notices, setNotices] = useState([]);

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

  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const name = student?.name || "Student";
  const department = student?.department || "CSE";
  const academicYear =
    student?.academicYear || student?.year || "Not specified";

  const departmentNotices = notices.filter(
    (notice) =>
      notice.department === department ||
      notice.department === "All"
  );

  const recentNotices = [...departmentNotices]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const departmentOnlyCount = notices.filter(
    (notice) => notice.department === department
  ).length;

  const collegeNoticesCount = notices.filter(
    (notice) => notice.department === "All"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <Header />

      <div className="flex flex-1 flex-col md:flex-row">
        <StudentSidebar />

        <main className="flex-1 min-w-0 p-5 md:p-8">

          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <p className="text-slate-500 text-sm">
                Student Portal / Dashboard
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">
                Welcome, {name}!
              </h1>

              <p className="text-slate-500 mt-2">
                Here are the latest updates for your department.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                  <UserRound size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {department} · Year {academicYear}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Bell size={22} />
              <span className="text-blue-100 text-sm">
                Your Department Notice Board
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">
              {department} Department
            </h2>

            <p className="text-blue-100 mt-2">
              Stay updated with announcements, events, academic notices and college news.
            </p>

            <Link
              to="/student/department"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2.5 rounded-xl mt-5 font-medium hover:bg-blue-50 transition"
            >
              Explore Department Notices
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">
                    Notices Available
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {departmentNotices.length}
                  </h3>
                </div>

                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                  <FileText size={22} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">
                    Department Notices
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {departmentOnlyCount}
                  </h3>
                </div>

                <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
                  <BookOpen size={22} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">
                    College-wide Notices
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {collegeNoticesCount}
                  </h3>
                </div>

                <div className="bg-orange-50 text-orange-600 p-3 rounded-xl">
                  <CalendarDays size={22} />
                </div>
              </div>
            </div>

          </div>

          {/* Latest Notices */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Latest Notices
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {department} department and college announcements
                </p>
              </div>

              <Link
                to="/student/notices"
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                View All Notices
                <ArrowRight size={16} className="inline ml-1" />
              </Link>
            </div>

            <div className="grid gap-4">
              {recentNotices.map((notice) => (
                <Link
                  to={`/student/notices/${notice.id}`}
                  key={notice.id}
                  className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
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

                  <h3 className="font-semibold text-slate-800">
                    {notice.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {notice.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                    <CalendarDays size={15} />
                    {notice.date}
                  </div>
                </Link>
              ))}

              {recentNotices.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  <FileText size={36} className="mx-auto mb-3" />

                  <h3 className="font-semibold text-slate-700">
                    No notices available
                  </h3>

                  <p className="text-sm mt-1">
                    Your department notices will appear here when published.
                  </p>
                </div>
              )}
            </div>

            <Link
              to="/student/department"
              className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium text-sm hover:underline"
            >
              View Department Notices
              <ArrowRight size={16} />
            </Link>

          </div>

        </main>
      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;