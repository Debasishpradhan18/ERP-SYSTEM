import React, { useState } from 'react';
import { Award, Download, Calendar, FileText, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { mockExaminationData } from '../../services/api';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const ExaminationResults = () => {
  const [activeTab, setActiveTab] = useState('Results');
  const [selectedSemester, setSelectedSemester] = useState('6th Semester');
  const data = mockExaminationData;

  const handleDownloadMarksheet = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    toast.success('Downloading Official Semester 6 Marksheet PDF...');
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs matching reference screenshot */}
      <div className="flex items-center gap-2 border-b border-[#232a3b] pb-4">
        {['Exam Schedule', 'Internal Marks', 'Results'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#079BB5] text-white shadow-lg shadow-[#079BB5]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#161c28]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Results' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Semester Results</h1>
              <p className="text-xs text-gray-400 mt-1">Grade cards and academic performance evaluation</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400">Semester:</span>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bg-[#171d2b] border border-[#232a3b] rounded-xl py-2 px-3 text-sm text-white font-medium focus:outline-none focus:border-[#079BB5]"
              >
                <option value="6th Semester">6th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="1st Semester">1st Semester</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject-wise Marks Table */}
            <div className="lg:col-span-2 bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                      <th className="py-3.5 px-4">Subject</th>
                      <th className="py-3.5 px-4">Max Marks</th>
                      <th className="py-3.5 px-4">Marks Obtained</th>
                      <th className="py-3.5 px-4">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2433] text-sm">
                    {data.results.map((r) => (
                      <tr key={r.id} className="hover:bg-[#161c28] transition-colors">
                        <td className="py-4 px-4 font-semibold text-white">{r.subject}</td>
                        <td className="py-4 px-4 text-gray-400">{r.maxMarks}</td>
                        <td className="py-4 px-4 font-bold text-white">{r.marksObtained}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg ${
                            r.grade.startsWith('A')
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}>
                            {r.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* GPA Scorecard & Download Badge */}
            <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
              <div className="w-full">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full inline-flex mb-3 border border-amber-500/20">
                  <Trophy className="w-10 h-10" />
                </div>

                <div className="my-4 space-y-4">
                  <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b]">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SGPA</p>
                    <p className="text-4xl font-black text-amber-400 mt-1">{data.sgpa}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b]">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CGPA</p>
                    <p className="text-4xl font-black text-emerald-400 mt-1">{data.cgpa}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadMarksheet}
                className="w-full py-3 bg-[#079BB5] hover:bg-[#06849a] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#079BB5]/20 mt-4"
              >
                <Download className="w-4 h-4" />
                <span>Download Marksheet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Exam Schedule' && (
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white tracking-wide">Upcoming Examination Timetable</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2433] text-sm">
                {data.schedule.map((s) => (
                  <tr key={s.id} className="hover:bg-[#161c28]">
                    <td className="py-4 px-4 font-semibold text-white">{s.subject}</td>
                    <td className="py-4 px-4 text-gray-300">{s.date}</td>
                    <td className="py-4 px-4 text-emerald-400">{s.time}</td>
                    <td className="py-4 px-4 text-gray-400">{s.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Internal Marks' && (
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white tracking-wide">Continuous Internal Assessment</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Mid Test 1 (30)</th>
                  <th className="py-3 px-4">Mid Test 2 (30)</th>
                  <th className="py-3 px-4">Assignment (10)</th>
                  <th className="py-3 px-4">Internal Total (50)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2433] text-sm">
                {data.internalMarks.map((m) => (
                  <tr key={m.id} className="hover:bg-[#161c28]">
                    <td className="py-4 px-4 font-semibold text-white">{m.subject}</td>
                    <td className="py-4 px-4 text-gray-300">{m.test1}</td>
                    <td className="py-4 px-4 text-gray-300">{m.test2}</td>
                    <td className="py-4 px-4 text-gray-300">{m.assignment}</td>
                    <td className="py-4 px-4 font-bold text-[#079BB5]">{m.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationResults;
