import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:8080/api/jobs";

export default function AddJobForm({ onJobAdded }: { onJobAdded: () => void }) {
  //const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "Please login again", "error");
        return;
      }

      await axios.post(`${API_BASE}/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire("Success", "Job added successfully!", "success");
      setFormData({ title: "", description: "", location: "", company: "" });
      onJobAdded(); // Refresh job list
    } catch (error: any) {
      Swal.fire("Error", error.response?.data || "Failed to add job", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Job</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Software Engineer"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Tech Mahindra"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Bengaluru"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job details, requirements, etc."
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
      >
        Add Job
      </button>
    </form>
  );
}
