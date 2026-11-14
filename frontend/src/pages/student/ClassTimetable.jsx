import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { mockTimetableData } from '../../services/api';

const ClassTimetable = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const data = mockTimetableData;

  const currentDaySchedule = data.weekly.find((d) => d.day === selectedDay)?.classes || data.today;

  return (
    <div className="space-y-6">
      {/* Top tabs matching reference screenshot */}
      <div className="flex items-center gap-2 border-b border-[#232a3b] pb-4">
        <button
          onClick={() => setActiveTab('Today')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'Today'
              ? 'bg-[#079BB5] text-white shadow-lg shadow-[#079BB5]/20'
              : 'text-gray-400 hover:text-white hover:bg-[#161c28]'
          }`}
        >
          Today's Timetable
        </button>
        <button
          onClick={() => setActiveTab('Weekly')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'Weekly'
              ? 'bg-[#079BB5] text-white shadow-lg shadow-[#079BB5]/20'
              : 'text-gray-400 hover:text-white hover:bg-[#161c28]'
          }`}
        >
          Weekly Timetable
        </button>
      </div>

      {activeTab === 'Today' ? (
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">Today's Class Schedule</h2>
            <span className="text-xs bg-[#7C3AED]/20 text-[#7C3AED] px-3 py-1 rounded-full font-semibold border border-[#7C3AED]/30">
              4 Lectures Today
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-3.5 px-4 w-12">#</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Faculty</th>
                  <th className="py-3.5 px-4">Room</th>
                  <th className="py-3.5 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2433] text-sm">
                {data.today.map((item) => (
                  <tr key={item.id} className="hover:bg-[#161c28] transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-400">{item.id}</td>
                    <td className="py-4 px-4 font-bold text-white">{item.subject}</td>
                    <td className="py-4 px-4 text-gray-300 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.faculty}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#1c2230] text-gray-300 border border-[#232a3b]">
                        <MapPin className="w-3 h-3 text-[#079BB5]" /> {item.room}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#079BB5] font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Day selection tabs */}
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedDay === day
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20'
                    : 'bg-[#171d2b] text-gray-400 hover:text-white border border-[#232a3b]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">{selectedDay}'s Class Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Faculty</th>
                    <th className="py-3 px-4">Room</th>
                    <th className="py-3 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2433] text-sm">
                  {currentDaySchedule.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-[#161c28]">
                      <td className="py-3.5 px-4 text-gray-400">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{item.subject}</td>
                      <td className="py-3.5 px-4 text-gray-300">{item.faculty}</td>
                      <td className="py-3.5 px-4 text-gray-400">{item.room}</td>
                      <td className="py-3.5 px-4 text-[#7C3AED] font-semibold">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTimetable;
