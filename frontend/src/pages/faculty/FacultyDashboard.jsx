import React, { useState } from 'react';
import { Users, BookOpen, CalendarCheck, Clock, CheckCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const FacultyDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState('DBMS');
  const [students, setStudents] = useState([
    { id: '22CSE088', name: 'Debasish Pradhan', status: 'Present' },
    { id: '22CSE089', name: 'Rohan Sharma', status: 'Present' },
    { id: '22CSE090', name: 'Ananya Sen', status: 'Present' },
    { id: '22CSE091', name: 'Priya Nayak', status: 'Absent' },
    { id: '22CSE092', name: 'Amit Mohanty', status: 'Present' },
  ]);

  const toggleStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s
      )
    );
  };

  const handleSaveAttendance = () => {
    toast.success(`Attendance submitted for ${selectedSubject}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Faculty Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Class Attendance & Academic Course Management</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-semibold">Active Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-[#171d2b] border border-[#232a3b] rounded-xl py-2 px-3 text-sm text-white font-semibold focus:outline-none focus:border-[#16A34A]"
          >
            <option value="DBMS">DBMS (CS601)</option>
            <option value="DBMS Lab">DBMS Lab (CS601L)</option>
            <option value="Web Tech">Web Tech (CS604)</option>
          </select>
        </div>
      </div>

      {/* Faculty Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#16A34A] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Assigned Subjects</p>
          <h3 className="text-3xl font-black mt-2">3 Courses</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <BookOpen className="w-16 h-16" />
          </div>
        </div>

        <div className="bg-[#079BB5] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Enrolled Students</p>
          <h3 className="text-3xl font-black mt-2">120 Students</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <Users className="w-16 h-16" />
          </div>
        </div>

        <div className="bg-[#7C3AED] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Lectures Today</p>
          <h3 className="text-3xl font-black mt-2">2 Classes</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <Clock className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Attendance Marking Sheet */}
      <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Mark Attendance: {selectedSubject}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Click any status button to toggle Present / Absent</p>
          </div>

          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 bg-[#16A34A] hover:bg-[#138a3e] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-[#16A34A]/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2433] text-sm">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#161c28]">
                  <td className="py-3.5 px-4 font-mono text-gray-300">{student.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{student.name}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-lg ${
                        student.status === 'Present'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(student.id)}
                      className="px-3 py-1 bg-[#171d2b] hover:bg-[#232a3b] text-gray-300 text-xs font-medium rounded-lg border border-[#232a3b] transition"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
