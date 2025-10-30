// src/pages/admin/AdminDashboard.tsx
import { useState } from "react";
import JobsManager from "./JobsManger";
import ApplicationsManager from "./ApplicationsManager";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect non-recruiters
  if (user?.role !== "RECRUITER") {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You are not authorized to access the admin dashboard.",
    });
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">{user?.email}</span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-blue-600 text-white flex">
        {[
          { key: "jobs", label: "Manage Jobs" },
          { key: "applications", label: "Manage Applications" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeTab === tab.key
                ? "bg-blue-700 border-b-4 border-blue-300"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "jobs" && <JobsManager />}
        {activeTab === "applications" && <ApplicationsManager />}
      </main>
    </div>
  );
}
