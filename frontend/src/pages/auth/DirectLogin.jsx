import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, RefreshCw, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const DirectLogin = () => {
  const navigate = useNavigate();
  const { loginUser, loading } = useAuth();

  const [username, setUsername] = useState('22CSE088');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('7RZD');

  const generateNewCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(code);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter your Username and Password');
      return;
    }

    if (captchaInput.trim().toUpperCase() !== generatedCaptcha) {
      toast.error('Invalid Captcha Code. Please enter the characters shown.');
      generateNewCaptcha();
      return;
    }

    const res = await loginUser(username.trim(), password.trim());
    if (res?.success) {
      const userRole = res.user?.role || (username.toLowerCase().includes('admin') ? 'admin' : username.toLowerCase().includes('faculty') ? 'faculty' : 'student');
      
      toast.success(`Welcome to Campus ERP (${userRole.toUpperCase()})!`);

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      toast.error(res?.message || 'Invalid Username or Password');
      generateNewCaptcha();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col justify-center items-center p-4 py-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#079BB5] via-[#16A34A] to-[#7C3AED] p-1 flex items-center justify-center shadow-2xl shadow-[#079BB5]/20">
            <div className="bg-[#121622] rounded-full flex flex-col items-center justify-center border-2 border-white/20 w-full h-full">
              <GraduationCap className="w-9 h-9 sm:w-11 sm:h-11 text-[#079BB5]" />
            </div>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
          Campus ERP
        </h1>
        <p className="text-xs text-[#079BB5] font-semibold tracking-wider uppercase mt-0.5">
          College Management System
        </p>
      </div>

      {/* Main Single Login Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-[#121622] border border-[#232a3b] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white tracking-wider uppercase">
            LOGIN
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Enter your Roll Number or University Email to access your portal
          </p>
        </div>

        {/* The Direct Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username / Roll Number / Admin Email"
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-2xl py-3 pl-4 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#079BB5] transition"
                required
              />
              <User className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-2xl py-3 pl-4 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#079BB5] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Captcha Section */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 rounded-2xl border border-white/10 select-none shrink-0 w-32">
              <span className="font-mono text-xl font-black tracking-widest text-cyan-300 italic transform -skew-x-6">
                {generatedCaptcha}
              </span>
              <button
                type="button"
                onClick={generateNewCaptcha}
                title="Refresh Captcha"
                className="p-1 text-gray-400 hover:text-white transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Captcha Code"
                maxLength={4}
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-2xl py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#079BB5] uppercase font-mono tracking-wider transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#DC3545] hover:bg-[#b52a38] text-white font-black tracking-wider uppercase rounded-2xl text-sm transition shadow-xl shadow-[#DC3545]/20 flex items-center justify-center gap-2 active:scale-[0.98] mt-2"
          >
            {loading ? 'Verifying...' : 'LOGIN'}
          </button>
        </form>

        {/* Quick Demo Switcher Pills in Footer (Super helpful for instant testing) */}
        <div className="mt-6 pt-4 border-t border-[#232a3b] text-center space-y-3">
          <p className="text-[11px] text-gray-400">Quick Fill Credentials for Testing:</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setUsername('22CSE088');
                setPassword('password123');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#079BB5]/10 text-[#079BB5] text-xs font-semibold hover:bg-[#079BB5]/20 border border-[#079BB5]/30 transition"
            >
              Fill Student
            </button>
            <button
              type="button"
              onClick={() => {
                setUsername('admin@campus.edu');
                setPassword('password123');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold hover:bg-[#7C3AED]/20 border border-[#7C3AED]/30 transition"
            >
              Fill Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setUsername('faculty@campus.edu');
                setPassword('password123');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold hover:bg-[#16A34A]/20 border border-[#16A34A]/30 transition"
            >
              Fill Faculty
            </button>
          </div>

          <p className="text-[10px] text-gray-500 pt-1">
            &copy; {new Date().getFullYear()} Campus ERP Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DirectLogin;
