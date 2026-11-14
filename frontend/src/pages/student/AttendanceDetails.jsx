import React, { useState, useEffect } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, AlertTriangle, Filter, Plus, Send } from 'lucide-react';
import api, { mockAttendanceData } from '../../services/api';
import toast from 'react-hot-toast';

const AttendanceDetails = () => {
  const [data, setData] = useState(mockAttendanceData);
  const [filterType, setFilterType] = useState('All');
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionSubject, setCorrectionSubject] = useState('DBMS');
  const [correctionDate, setCorrectionDate] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/student/attendance');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Using mock attendance data:', err.message);
      }
    };
    fetchAttendance();
  }, []);

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    if (!correctionReason || !correctionDate) {
      toast.error('Please specify both date and reason');
      return;
    }
    toast.success('Attendance correction request submitted to faculty!');
    setShowCorrectionModal(false);
    setCorrectionReason('');
    setCorrectionDate('');
  };

  const filteredRecords = data.records?.filter((r) => {
    if (filterType === 'All') return true;
    return r.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Attendance Details</h1>
          <p className="text-sm text-gray-400 mt-1">Subject-wise attendance record</p>
        </div>

        <button
          onClick={() => setShowCorrectionModal(true)}
          className="px-4 py-2 bg-[#079BB5] hover:bg-[#06849a] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-lg shadow-[#079BB5]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Correction Request</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards matching reference screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Classes */}
        <div className="bg-[#079BB5] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total Classes</p>
          <h3 className="text-3xl font-black mt-2">{data.summary?.totalClasses || 120}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <CalendarCheck className="w-16 h-16" />
          </div>
        </div>

        {/* Present */}
        <div className="bg-[#16A34A] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Present</p>
          <h3 className="text-3xl font-black mt-2">{data.summary?.presentClasses || 98}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <CheckCircle2 className="w-16 h-16" />
          </div>
        </div>

        {/* Absent */}
        <div className="bg-[#DC3545] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Absent</p>
          <h3 className="text-3xl font-black mt-2">{data.summary?.absentClasses || 22}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <XCircle className="w-16 h-16" />
          </div>
        </div>

        {/* Percentage */}
        <div className="bg-[#7C3AED] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Percentage</p>
          <h3 className="text-3xl font-black mt-2">{data.summary?.overallPercentage || '81.67%'}</h3>
          <div className="absolute right-3 bottom-3 opacity-15">
            <AlertTriangle className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-white tracking-wide">Subject Breakdown</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex bg-[#171d2b] p-1 rounded-lg border border-[#232a3b]">
              {['All', 'Theory', 'Lab'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    filterType === type ? 'bg-[#079BB5] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Present</th>
                <th className="py-3.5 px-4">Absent</th>
                <th className="py-3.5 px-4">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2433] text-sm">
              {filteredRecords?.map((r) => {
                const pctNumber = parseFloat(r.percentage);
                let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                if (pctNumber < 65) {
                  badgeColor = 'bg-red-500/10 text-red-400 border-red-500/30';
                } else if (pctNumber < 75) {
                  badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                }

                return (
                  <tr key={r.id || r.subject} className="hover:bg-[#161c28] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">{r.subject}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#1c2230] text-gray-300 border border-[#232a3b]">
                        {r.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{r.total}</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">{r.present}</td>
                    <td className="py-4 px-4 text-red-400 font-semibold">{r.absent}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg border ${badgeColor}`}>
                        {r.percentage}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Correction Request Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Request Attendance Correction</h3>
            <p className="text-xs text-gray-400 mb-4">
              Submit an attendance dispute if you were present or had an official duty approval.
            </p>

            <form onSubmit={handleCorrectionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Subject</label>
                <select
                  value={correctionSubject}
                  onChange={(e) => setCorrectionSubject(e.target.value)}
                  className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[#079BB5]"
                >
                  <option value="DBMS">DBMS</option>
                  <option value="Operating System">Operating System</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="Web Technology">Web Technology</option>
                  <option value="DBMS Lab">DBMS Lab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Class Date</label>
                <input
                  type="date"
                  value={correctionDate}
                  onChange={(e) => setCorrectionDate(e.target.value)}
                  className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[#079BB5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Reason / Justification</label>
                <textarea
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="e.g. Attended conference / Faculty marked absent by mistake"
                  className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[#079BB5] h-20"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#232a3b]">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#079BB5] hover:bg-[#06849a] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-[#079BB5]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
