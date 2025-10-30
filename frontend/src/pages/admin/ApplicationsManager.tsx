// src/pages/admin/ApplicationsManager.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// ✅ Updated interface to include userName and jobTitle instead of IDs
interface Application {
  id: number;
  userName: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
}

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all applications with jobTitle & userName
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get<Application[]>(
        "http://localhost:8080/api/applications/list",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      setApplications(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch applications:", err);
      Swal.fire("Error", "Failed to fetch applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading applications...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Job Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{app.id}</td>
                  <td className="border px-4 py-2 text-center">
                    {app.userName}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {app.jobTitle}
                  </td>
                  <td className="border px-4 py-2 text-center">{app.status}</td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(app.appliedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
