import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Building2, Mail, Loader2 } from 'lucide-react';
import { getJobById, applyToJob, type Job } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user?.email);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const jobId = parseInt(id, 10); // FIXED: parseInt(id, 10)
        const data = await getJobById(jobId);
        setJob(data);
      } catch {
        toast.error('Job not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    try {
      const jobId = parseInt(id!, 10); // FIXED: parseInt + ! for non-null
      await applyToJob(user.id, jobId);
      toast.success('Applied successfully!');
    } catch {
      toast.error('Failed to apply');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin" /></div>;
  if (!job) return <div className="text-center py-20 text-red-500">Job not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/jobs" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Jobs
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-6">
            <div className="flex items-center gap-2"><Building2 className="w-5 h-5" />{job.company}</div>
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5" />{job.location}</div>
            <div className="flex items-center gap-2"><Mail className="w-5 h-5" />{job.postedByEmail}</div>
          </div>

          <div className="prose dark:prose-invert mb-8">
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          <button
            onClick={handleApply}
            className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}