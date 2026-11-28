
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  UserRound,
  LogOut,
} from "lucide-react";

function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "All Notices",
      path: "/student/notices",
      icon: FileText,
    },
    {
      name: "Department Notices",
      path: "/student/department",
      icon: BookOpen,
    },
    {
      name: "My Profile",
      path: "/student/profile",
      icon: UserRound,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    navigate("/login");
  };

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-slate-900 text-white p-5 flex flex-col">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          Campus Notice Board
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Student Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (item.path === "/student/notices" &&
              location.pathname.startsWith("/student/notices/"));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-8 md:mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-slate-300 hover:bg-red-500/10 hover:text-red-400 px-4 py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default StudentSidebar;
