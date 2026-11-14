import React from 'react';
import { Users, GraduationCap, Building2, AlertTriangle } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockAdminStats } from '../../services/api';

const AdminDashboard = () => {
  const { stats, attendanceSummary, complaintsOverview } = mockAdminStats;

  const donutData = [
    { name: 'Present (82%)', value: 82, color: '#079BB5' },
    { name: 'Absent (18%)', value: 18, color: '#DC3545' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">University Institutional Control & Analytics</p>
      </div>

      {/* 4 Stat Cards matching reference screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-[#079BB5] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total Students</p>
          <h3 className="text-3xl font-black mt-2">{stats.totalStudents}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <GraduationCap className="w-16 h-16" />
          </div>
        </div>

        {/* Total Faculty */}
        <div className="bg-[#16A34A] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total Faculty</p>
          <h3 className="text-3xl font-black mt-2">{stats.totalFaculty}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <Users className="w-16 h-16" />
          </div>
        </div>

        {/* Total Departments */}
        <div className="bg-[#7C3AED] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total Departments</p>
          <h3 className="text-3xl font-black mt-2">{stats.totalDepartments}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <Building2 className="w-16 h-16" />
          </div>
        </div>

        {/* Open Complaints */}
        <div className="bg-[#DC3545] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Open Complaints</p>
          <h3 className="text-3xl font-black mt-2">{stats.openComplaints}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <AlertTriangle className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Analytics Charts matching reference screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Attendance Summary */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-wide">Attendance Summary</h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#079BB5]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#079BB5]" /> Present (82%)
              </span>
              <span className="flex items-center gap-1.5 text-[#DC3545]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC3545]" /> Absent (18%)
              </span>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#171d2b', borderColor: '#232a3b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            Campus-wide aggregate student attendance this semester
          </p>
        </div>

        {/* Bar Chart: Complaints Overview */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-wide">Complaints Overview</h2>
            <span className="text-xs text-gray-400">Status resolution breakdown</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintsOverview}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171d2b', borderColor: '#232a3b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {complaintsOverview.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            22 of 39 complaints successfully resolved this academic cycle
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
