
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getStoredNotices } from "../../data/noticeStorage";
import StudentSidebar from "../../components/student/StudentSidebar";

import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Building2,
  Tag,
} from "lucide-react";

function NoticeDetails() {
  const { id } = useParams();

  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const department = student?.department || "CSE";

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = () => {
      setNotices(getStoredNotices());
      setLoading(false);
    };

    loadNotices();

    window.addEventListener("storage", loadNotices);

    return () => {
      window.removeEventListener("storage", loadNotices);
    };
  }, []);

  const notice = notices.find(
    (item) => String(item.id) === String(id)
  );

  const isAllowed =
    notice &&
    (notice.department === department ||
      notice.department === "All");

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Loading notice...</p>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

        <StudentSidebar />

        <main className="flex-1 min-w-0 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">

            <FileText
              size={45}
              className="mx-auto text-slate-400 mb-4"
            />

            <h2 className="text-2xl font-bold text-slate-800">
              Notice Not Found
            </h2>

            <p className="text-slate-500 mt-2">
              This notice does not exist or is not available for your department.
            </p>

            <Link
              to="/student/notices"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              <ArrowLeft size={18} />
              Back to Notices
            </Link>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      <StudentSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-8">
        <div className="max-w-4xl mx-auto">

          <Link
            to="/student/notices"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition"
          >
            <ArrowLeft size={18} />
            Back to All Notices
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* Notice Header */}
            <div className="p-6 md:p-8 border-b border-slate-100">

              <div className="flex flex-wrap items-center gap-3 mb-5">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {notice.category}
                </span>

                {notice.priority && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      notice.priority === "Important"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {notice.priority}
                  </span>
                )}

              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {notice.title}
              </h1>

              <p className="text-slate-500 mt-4 leading-relaxed">
                {notice.description}
              </p>

              <div className="flex flex-wrap gap-5 mt-6 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {notice.date}
                </div>

                <div className="flex items-center gap-2">
                  <Building2 size={17} />
                  {notice.department === "All"
                    ? "All Departments"
                    : notice.department}
                </div>

                <div className="flex items-center gap-2">
                  <Tag size={17} />
                  {notice.category}
                </div>

              </div>
            </div>

            {/* Full Notice Content */}
            <div className="p-6 md:p-8">

              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Notice Details
              </h2>

              <p className="text-slate-600 leading-8 whitespace-pre-line">
                {notice.content || notice.description}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  This notice is published on the Campus Digital Notice Board.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default NoticeDetails;
