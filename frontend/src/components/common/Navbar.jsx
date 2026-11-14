import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0d1017]/90 backdrop-blur-md border-b border-[#1e2433] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
      {/* Left side: Hamburger button + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-400 hover:text-white lg:hidden rounded-lg hover:bg-[#161c28]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#141923] border border-[#232a3b] text-sm text-gray-200 pl-10 pr-4 py-1.5 rounded-lg focus:outline-none focus:border-[#079BB5] transition-colors placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right side: Notifications + User profile badge */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#161c28] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC3545] rounded-full ring-2 ring-[#0d1017]" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#141923] border border-[#232a3b] rounded-xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#232a3b]">
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
                <span className="text-xs bg-[#079BB5]/20 text-[#079BB5] px-2 py-0.5 rounded-full font-medium">3 New</span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-2 rounded-lg bg-[#1c2230] hover:bg-[#232b3d] cursor-pointer transition">
                  <p className="font-medium text-white">Mid-Semester Exam Schedule</p>
                  <p className="text-gray-400 mt-0.5">Exam schedule has been published for Sem 6.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#1c2230] hover:bg-[#232b3d] cursor-pointer transition">
                  <p className="font-medium text-white">Attendance Shortfall Alert</p>
                  <p className="text-gray-400 mt-0.5">Computer Networks attendance is at 73.33%.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#1c2230] hover:bg-[#232b3d] cursor-pointer transition">
                  <p className="font-medium text-white">Fee Due Reminder</p>
                  <p className="text-gray-400 mt-0.5">Remaining ₹5,000 due by 30th April.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill Badge */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#161c28] cursor-pointer border border-transparent hover:border-[#232a3b] transition"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#079BB5]/40"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-bold text-white tracking-wide">{user?.name || 'Debasish Pradhan'}</span>
              <span className="text-xs text-gray-400">{user?.batch || 'B.Tech CSE | Final Year'}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#141923] border border-[#232a3b] rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-[#232a3b]">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/student/profile');
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1f2737] flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-gray-400" />
                Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
