import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginUser, loading } = useAuth();
  const [email, setEmail] = useState('admin@campus.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(email, password, 'admin');
    if (res?.success) {
      toast.success('Welcome back, Administrator!');
      navigate('/admin/dashboard');
    } else {
      toast.error(res?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-[#121622] border border-[#232a3b] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white mb-5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Selection
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 sm:p-3 bg-[#7C3AED] rounded-xl text-white shrink-0 shadow-md shadow-[#7C3AED]/20">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Admin Control</h2>
            <p className="text-xs text-gray-400">Master access for university administrators</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#7C3AED]/25 flex items-center justify-center active:scale-[0.99]"
          >
            {loading ? 'Authenticating...' : 'Sign In as Administrator'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#232a3b] text-center">
          <p className="text-xs text-gray-400">
            Demo: <span className="text-gray-200 font-mono">admin@campus.edu</span> / <span className="text-gray-200 font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
