// src/pages/MyJobs.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecruiterJobs, type Job } from '../services/api';
import { toast } from 'react-toastify';

export default function MyJobs() {
  const email = 'mahadevbhatt4404@gmail.com'; // Replace with login
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRecruiterJobs(email);
        setJobs(data);
      } catch {
        toast.error('Failed to load your jobs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [email]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Posted Jobs</h1>
          <Link to="/post-job" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
                <Link to={`/jobs/${job.id}`} className="text-blue-600 text-sm mt-2 inline-block">
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}