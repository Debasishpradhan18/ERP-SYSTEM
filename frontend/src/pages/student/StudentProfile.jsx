import React from 'react';
import { User, Phone, Mail, Building, MapPin, Award, BookOpen, Calendar, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudentData } from '../../services/api';

const StudentProfile = () => {
  const { user } = useAuth();
  const student = mockStudentData.student;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Student Profile</h1>
        <p className="text-sm text-gray-400 mt-1">Official University Enrollment & Proctor Details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={user?.avatar || student.avatar}
              alt={user?.name || student.name}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-[#079BB5]/40"
            />
            <span className="absolute bottom-1 right-1 p-1.5 bg-[#16A34A] rounded-full ring-4 ring-[#121622]" />
          </div>

          <h2 className="text-xl font-bold text-white mt-4">{user?.name || student.name}</h2>
          <p className="text-xs text-[#079BB5] font-semibold mt-0.5">{student.batch}</p>
          <p className="text-xs text-gray-400">{student.department}</p>

          <div className="w-full mt-6 pt-6 border-t border-[#232a3b] space-y-3 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Roll Number:</span>
              <span className="font-semibold text-white text-xs">{student.rollNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Registration No:</span>
              <span className="font-semibold text-white text-xs">REG-2022-CSE-088</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Current Semester:</span>
              <span className="font-semibold text-white text-xs">Semester 6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Academic Status:</span>
              <span className="font-semibold text-emerald-400 text-xs">Active Regular</span>
            </div>
          </div>
        </div>

        {/* Proctor Details Card matching reference Card 3 */}
        <div className="lg:col-span-2 bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#232a3b]">
            <div className="p-3 bg-[#475569] rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Assigned Faculty Proctor</h3>
              <p className="text-xs text-gray-400">Mentor for academic progress and university guidance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Proctor Name</p>
              <p className="text-base font-bold text-white">{student.proctor.name}</p>
              <p className="text-xs text-[#079BB5]">Senior Faculty Mentor</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Department</p>
              <p className="text-base font-bold text-white">{student.proctor.department}</p>
              <p className="text-xs text-gray-400">School of Engineering</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Contact Phone</p>
              <p className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {student.proctor.phone}
              </p>
              <p className="text-xs text-gray-400">Office hours: 10 AM - 4 PM</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Official Email</p>
              <p className="text-base font-bold text-[#079BB5] flex items-center gap-2">
                <Mail className="w-4 h-4" /> {student.proctor.email}
              </p>
              <p className="text-xs text-gray-400">{student.proctor.cabin}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171d2b]/60 border border-[#232a3b] text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">Note:</strong> Proctor meetings are scheduled bi-weekly. For urgent academic attendance or fee clearance, visit Block B - Room 302 or message your proctor directly through the ERP messaging window.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
