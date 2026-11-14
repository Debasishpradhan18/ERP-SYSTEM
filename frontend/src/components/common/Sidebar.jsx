import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  Calendar,
  FileText,
  Wallet,
  MessageSquare,
  Bell,
  User,
  Users,
  Building2,
  FileSpreadsheet,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/student/attendance', icon: CalendarCheck },
    { name: 'Examination', path: '/student/examination', icon: BookOpen },
    { name: 'Timetable', path: '/student/timetable', icon: Calendar },
    { name: 'Assignments', path: '/student/assignments', icon: FileText },
    { name: 'Due Amount', path: '/student/fees', icon: Wallet },
    { name: 'Raise a Problem', path: '/student/complaints', icon: MessageSquare },
    { name: 'Notice Board', path: '/student/notices', icon: Bell },
    { name: 'My Profile', path: '/student/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Faculty', path: '/admin/faculty', icon: User },
    { name: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { name: 'Timetable', path: '/admin/timetable', icon: Calendar },
    { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { name: 'Examination', path: '/admin/examination', icon: FileSpreadsheet },
    { name: 'Fees', path: '/admin/fees', icon: Wallet },
    { name: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
    { name: 'Notice Board', path: '/admin/notices', icon: Bell },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0d1017] border-r border-[#1e2433] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#1e2433]/70">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}>
            <div className="p-2 bg-[#079BB5]/20 rounded-lg text-[#079BB5]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Campus ERP</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#079BB5] text-white shadow-md shadow-[#079BB5]/20 font-semibold'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-[#161c28]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#1e2433]/70">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
