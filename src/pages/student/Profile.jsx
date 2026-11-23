
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

function Profile() {
  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">
            Student not logged in
          </h1>
          <Link to="/login" className="text-blue-600 mt-4 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const name = student.name || "Student";
  const department = student.department || "Not specified";
  const academicYear = student.academicYear || student.year || "Not specified";

  return (
    <div className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm text-slate-500">
            Student Portal / Profile
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            View your personal and academic information.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
              <UserRound size={36} className="text-blue-600" />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800">
                {name}
              </h2>

              <p className="text-slate-500 mt-1">
                Student · {department}
              </p>

              <span className="inline-block mt-3 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                Student Account
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <UserRound size={17} />
                Full Name
              </div>

              <p className="font-medium text-slate-800">
                {name}
              </p>
            </div>

            {/* Email */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Mail size={17} />
                Email Address
              </div>

              <p className="font-medium text-slate-800 break-all">
                {student.email || "Not specified"}
              </p>
            </div>

          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Academic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Department */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <BookOpen size={17} />
                Department
              </div>

              <p className="font-medium text-slate-800">
                {department}
              </p>
            </div>

            {/* Academic Year */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <CalendarDays size={17} />
                Academic Year
              </div>

              <p className="font-medium text-slate-800">
                {academicYear}
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <Link
            to="/student/notices"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            <GraduationCap size={18} />
            View Notices
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Profile;
