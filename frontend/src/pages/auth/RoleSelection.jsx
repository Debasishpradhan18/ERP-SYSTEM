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
      {/* Left side: Campus hero graphic */}
      <div className="relative md:w-1/2 min-h-[320px] md:min-h-screen flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-cover bg-center"
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(7, 9, 14, 0.4), rgba(7, 9, 14, 0.9)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80')`,
           }}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#079BB5] rounded-xl text-white shadow-lg shadow-[#079BB5]/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Campus ERP</h1>
            <p className="text-xs text-gray-300">College Management System</p>
          </div>
        </div>

        <div className="my-auto py-10">
          <span className="inline-block px-3 py-1 bg-[#079BB5]/20 text-[#079BB5] text-xs font-semibold rounded-full mb-3 border border-[#079BB5]/30">
            Next-Gen Academic ERP
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Empowering Higher Education Excellence
          </h2>
          <p className="mt-4 text-gray-300 text-sm md:text-base max-w-lg leading-relaxed">
            Real-time attendance tracking, automated grade calculation, timetable scheduling, fee disbursement, and integrated grievance management.
          </p>
        </div>

        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Campus ERP Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Role selector cards matching reference screenshot */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-[#121622] border border-[#232a3b] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Login to Campus ERP</h2>
            <p className="text-sm text-gray-400 mt-1.5">Select your role to continue</p>
          </div>

          <div className="space-y-4">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  onClick={() => navigate(r.path)}
                  className="group flex items-center justify-between p-4 rounded-xl border border-[#232a3b] bg-[#171d2b] hover:border-[#079BB5] hover:bg-[#1a2131] cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: r.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white group-hover:text-[#079BB5] transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                    </div>
                  </div>
                  <div className="p-2 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[#232a3b] text-center text-xs text-gray-400">
            Need technical assistance? Contact <span className="text-[#079BB5] hover:underline cursor-pointer">ERP Support Helpdesk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
