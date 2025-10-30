import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user + localStorage
    navigate('/');
  };

  return (
    <nav className="bg-black dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-white">JobPortal</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/jobs" className="hover:text-blue-600 text-white">
              Jobs
            </Link>

            {user ? (
              <>
                <span className="text-sm text-white">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600 text-white">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-blue-600 text-sm text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
