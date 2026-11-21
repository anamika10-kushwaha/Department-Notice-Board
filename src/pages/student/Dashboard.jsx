
function Dashboard() {
  const student = JSON.parse(
    localStorage.getItem("loggedInStudent") || "null"
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome, {student?.name || "Student"}!
      </h1>

      <p className="mt-3 text-slate-600">
        Department: {student?.department}
      </p>

      <p className="text-slate-600">
        Academic Year: {student?.year}
      </p>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          Your Department Notice Board appears here
        </h2>

        <p className="text-slate-500 mt-2">
          Your department notices will appear here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
