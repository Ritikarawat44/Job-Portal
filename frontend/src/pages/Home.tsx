import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Building2,
  MapPin,
  Users,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { searchJobs, type Job } from '../services/api'; // TYPE-ONLY IMPORT

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search triggered:', { searchTerm, location });

    if (!searchTerm.trim() && !location.trim()) {
      setError('Please enter a job title or location');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const jobs = await searchJobs(searchTerm, location);
      console.log('Jobs received:', jobs);
      setResults(jobs);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.message || 'Failed to load jobs');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">

        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Find Your <span className="block mt-2">Dream Job</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with top companies and land your perfect role — faster than ever.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all"
                  />
                </div>

                <div className="sm:w-56 relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>Search Jobs</span>
                </button>
              </div>
            </div>
          </motion.form>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-500 text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* Search Results */}
          {searched && !loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                  {results.length} job{results.length > 1 ? 's' : ''} found
                </p>
                <div className="space-y-3">
                  {results.slice(0, 4).map((job) => (
                    <div
                      key={job.id}
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                      >
                        View <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
                {results.length > 4 && (
                  <div className="text-center mt-5">
                    <Link
                      to="/jobs"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View all {results.length} jobs →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {searched && !loading && results.length === 0 && !error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-gray-500 text-center"
            >
              No jobs found. Try different keywords.
            </motion.p>
          )}

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              1,234+ jobs live now
            </span>
            <span>•</span>
            <span>Updated every 5 minutes</span>
            <span>•</span>
            <span>Verified companies only</span>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Building2, value: "1,234+", label: "Active Jobs", gradient: "from-blue-500 to-indigo-500" },
            { icon: Users, value: "892", label: "Companies Hiring", gradient: "from-emerald-500 to-teal-500" },
            { icon: MapPin, value: "Global", label: "Remote & On-site", gradient: "from-purple-500 to-pink-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className={`p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700`}>
                <div className={`w-16 h-16 mx-auto mb-5 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Browse All Jobs Button */}
            <Link
              to="/jobs"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Browse All Jobs</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* My Applications Button */}
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>View My Applications</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            No account needed • Start exploring in seconds
          </p>
        </motion.section>
      </div>
    </div>
  );
}
