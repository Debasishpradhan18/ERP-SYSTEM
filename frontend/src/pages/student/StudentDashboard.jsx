import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  BookOpen,
  UserCheck,
  Wallet,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  BookMarked,
  MapPin,
  Sparkles,
} from 'lucide-react';
import ModuleCard from '../../components/dashboard/ModuleCard';
import CircularGauge from '../../components/common/CircularGauge';
import api, { mockStudentData } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(mockStudentData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/student/dashboard');
        if (res.data.success) {
          setDashboardData(res.data.data);
        }
      } catch (err) {
        console.warn('Using mock dashboard data:', err.message);
      }
    };
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: 'Attendance',
      icon: CalendarCheck,
      color: '#079BB5',
      link: '/student/attendance',
      info: 'More info',
    },
    {
      title: 'Examination',
      icon: BookOpen,
      color: '#16A34A',
      link: '/student/examination',
      info: 'More info',
    },
    {
      title: 'Proctor',
      icon: UserCheck,
      color: '#475569',
      link: '/student/profile',
      info: 'More info',
    },
    {
      title: 'Due Amount',
      icon: Wallet,
      color: '#DC3545',
      link: '/student/fees',
      info: 'More info',
    },
    {
      title: 'Timetable',
      icon: Calendar,
      color: '#7C3AED',
      link: '/student/timetable',
      info: 'More info',
    },
    {
      title: 'Raise a Problem',
      icon: MessageSquare,
      color: '#EA8000',
      link: '/student/complaints',
      info: 'More info',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {user?.name?.split(' ')[0] || 'Debasish'}
            </h1>
            <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
          </div>
          <p className="text-sm text-gray-400 mt-1 font-medium">
            {user?.department || 'B.Tech - Computer Science & Engineering'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[#171d2b] border border-[#232a3b] text-xs font-semibold text-[#079BB5] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semester 6</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[#171d2b] border border-[#232a3b] text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <span>CGPA: {dashboardData.student?.cgpa || 8.31}</span>
          </div>
        </div>
      </div>

      {/* The Six Colorful Module Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <ModuleCard
            key={c.title}
            title={c.title}
            icon={c.icon}
            color={c.color}
            link={c.link}
            info={c.info}
          />
        ))}
      </div>

      {/* Bottom Section: Attendance Overview & Today's Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview Card */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-wide">Attendance Overview</h2>
            <button
              onClick={() => navigate('/student/attendance')}
              className="text-xs font-semibold text-[#079BB5] hover:text-[#06869c] flex items-center gap-1 transition"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 my-auto">
            <CircularGauge
              percentage={dashboardData.attendanceOverview?.theory || 85}
              label="Theory"
              color="#079BB5"
            />
            <CircularGauge
              percentage={dashboardData.attendanceOverview?.lab || 78}
              label="Lab"
              color="#16A34A"
            />
            <CircularGauge
              percentage={dashboardData.attendanceOverview?.total || 82}
              label="Total"
              color="#7C3AED"
            />
          </div>

          <div className="pt-4 mt-2 border-t border-[#232a3b]/70 flex items-center justify-between text-xs text-gray-400">
            <span>Minimum Requirement: 75%</span>
            <span className="text-emerald-400 font-medium">Eligible for Exams</span>
          </div>
        </div>

        {/* Today's Timetable Card */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-lg font-bold text-white tracking-wide">Today's Timetable</h2>
            </div>
            <button
              onClick={() => navigate('/student/timetable')}
              className="text-xs font-semibold text-[#7C3AED] hover:text-[#6929d5] flex items-center gap-1 transition"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 my-auto">
            {dashboardData.todayTimetable?.slice(0, 3).map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#171d2b] border border-[#232a3b] hover:border-[#7C3AED]/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 rounded-full bg-[#7C3AED] group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.subject}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <span>{item.faculty}</span>
                      <span>•</span>
                      <span className="text-gray-300 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" /> {item.room}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-gray-300 bg-[#0d1017] px-3 py-1.5 rounded-lg border border-[#232a3b]">
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-[#232a3b]/70 flex items-center justify-between text-xs text-gray-400">
            <span>Room location: Block A & B</span>
            <span className="text-[#079BB5]">3 Classes Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
