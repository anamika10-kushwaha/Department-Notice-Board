
import { useParams, Link } from "react-router-dom";
import { notices } from "../../data/notices";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";

function NoticeDetails() {
  const { id } = useParams();

  const notice = notices.find((item) => item.id === Number(id));

  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  const department = student?.department || "CSE";

  // Check if this notice is visible to this student
  const isAllowed =
    notice &&
    (notice.department === department || notice.department === "All");

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
          <FileText className="mx-auto text-slate-400" size={40} />
          <h1 className="text-xl font-bold text-slate-800 mt-3">
            Notice not found
          </h1>
          <p className="text-slate-500 mt-2">
            This notice doesn't exist or isn't available to your department.
          </p>
          <Link
            to="/student/notices"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Back to Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/student/notices"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back to All Notices
        </Link>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10">

          <div className="flex gap-2 flex-wrap mb-5">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {notice.category}
            </span>

            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">
              {notice.department === "All"
                ? "College-wide"
                : notice.department}
            </span>

            {notice.priority && (
              <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs">
                {notice.priority}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
            {notice.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-400 mt-4 pb-6 border-b border-slate-200">
            <CalendarDays size={16} />
            Published on {notice.date}
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-slate-800 text-lg mb-4">
              Announcement
            </h2>

            <p className="text-slate-600 leading-8 whitespace-pre-line">
              {notice.content || notice.description}
            </p>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <p className="text-sm text-blue-800">
              Please check the notice regularly for updates from your college or department.
            </p>
          </div>

        </article>
      </div>
    </div>
  );
}

export default NoticeDetails;
