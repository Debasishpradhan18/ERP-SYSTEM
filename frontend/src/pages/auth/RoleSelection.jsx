import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Student Login',
      description: 'Access attendance, grades, timetable & fee records',
      icon: GraduationCap,
      color: '#079BB5',
      path: '/login/student',
    },
    {
      title: 'Faculty Login',
      description: 'Mark attendance, manage courses & submit grades',
      icon: Users,
      color: '#16A34A',
      path: '/login/faculty',
    },
    {
      title: 'Admin Login',
      description: 'System administration, fee records & departments',
      icon: ShieldCheck,
      color: '#7C3AED',
      path: '/login/admin',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#07090E] flex flex-col md:flex-row">
      {/* Desktop Left Side: Full University Hero Graphic (Hidden on small mobile screens to prevent layout overflow) */}
      <div
        className="hidden md:flex md:w-1/2 min-h-screen flex-col justify-between p-8 lg:p-12 overflow-hidden bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(7, 9, 14, 0.4), rgba(7, 9, 14, 0.9)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80')`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#079BB5] rounded-xl text-white shadow-lg shadow-[#079BB5]/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Campus ERP</h1>
            <p className="text-xs text-gray-300">College Management System</p>
          </div>
        </div>

        <div className="my-auto py-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-[#079BB5]/20 text-[#079BB5] text-xs font-semibold rounded-full mb-3 border border-[#079BB5]/30">
            Next-Gen Academic ERP
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
            Empowering Higher Education Excellence
          </h2>
          <p className="mt-4 text-gray-300 text-sm lg:text-base leading-relaxed">
            Real-time attendance tracking, automated grade calculation, timetable scheduling, fee disbursement, and integrated grievance management.
          </p>
        </div>

        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Campus ERP Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side / Mobile View: Centered, Compact, and Beautifully Spaced */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-screen">
        {/* Mobile Header Banner (Visible ONLY on mobile devices) */}
        <div className="md:hidden flex flex-col items-center text-center mb-6 pt-2">
          <div className="p-3 bg-[#079BB5] rounded-2xl text-white shadow-lg shadow-[#079BB5]/30 mb-2">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Campus ERP</h1>
          <p className="text-xs text-gray-400">College Management System</p>
        </div>

        {/* The Role Selection Card */}
        <div className="w-full max-w-md bg-[#121622] border border-[#232a3b] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Login to Campus ERP</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Select your role to continue</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  onClick={() => navigate(r.path)}
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-[#232a3b] bg-[#171d2b] hover:border-[#079BB5] hover:bg-[#1a2131] cursor-pointer transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="p-2.5 sm:p-3 rounded-lg text-white shrink-0"
                      style={{ backgroundColor: r.color }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#079BB5] transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                    </div>
                  </div>
                  <div className="p-1.5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 pt-5 border-t border-[#232a3b] text-center text-[11px] sm:text-xs text-gray-400">
            Need technical assistance? Contact{' '}
            <span className="text-[#079BB5] hover:underline cursor-pointer">ERP Support Helpdesk</span>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden text-[11px] text-gray-500 mt-6 text-center">
          &copy; {new Date().getFullYear()} Campus ERP Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
