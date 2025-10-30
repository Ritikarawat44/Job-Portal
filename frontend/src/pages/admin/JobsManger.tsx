import { useEffect, useState } from "react";
import axios from "axios";
//import Swal from "sweetalert2";
import AddJobForm from "./AddJobForm";

const API_BASE = "http://localhost:8080/api/jobs";

export default function JobsManager() {
  const [jobs, setJobs] = useState<any[]>([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="space-y-8">
      {/* Add Job Form */}
      <AddJobForm onJobAdded={fetchJobs} />

      {/* Jobs List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Existing Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs available.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Company</th>
                <th className="py-2 px-3 text-left">Location</th>
                <th className="py-2 px-3 text-left">Posted By</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-3">{job.title}</td>
                  <td className="py-2 px-3">{job.company}</td>
                  <td className="py-2 px-3">{job.location}</td>
                  <td className="py-2 px-3">{job.postedByEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
