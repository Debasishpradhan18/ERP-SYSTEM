import React, { useState } from 'react';
import { Bell, Calendar, Pin, AlertCircle, FileText } from 'lucide-react';

const NoticeBoard = () => {
  const [filter, setFilter] = useState('All');

  const notices = [
    {
      id: 1,
      title: 'Mid-Semester Examination Schedule Announced',
      category: 'Examination',
      date: '12 May 2026',
      content: 'The 6th Semester Mid-Term Examinations will commence from 18th May 2026. Students are requested to check the examination schedule tab for subject-wise room allotments.',
      isImportant: true,
      postedBy: 'Controller of Examinations',
    },
    {
      id: 2,
      title: 'Campus Placement Drive - Tech Mahindra & Infosys',
      category: 'Events',
      date: '08 May 2026',
      content: 'Final Year B.Tech students with CGPA >= 7.5 are eligible for the upcoming recruitment drive scheduled next Wednesday at the Main Auditorium.',
      isImportant: true,
      postedBy: 'Training & Placement Cell',
    },
    {
      id: 3,
      title: 'Semester Fee Payment Deadline Extension',
      category: 'Fees',
      date: '02 May 2026',
      content: 'The last date to clear the remaining semester fee dues without late fee penalty has been extended to 30th April 2026.',
      isImportant: false,
      postedBy: 'Finance & Accounts Section',
    },
    {
      id: 4,
      title: 'Submission of Final Year Project Synopses',
      category: 'Academic',
      date: '28 Apr 2026',
      content: 'All project groups must submit their initial synopsis signed by their respective proctor to the department office before Friday.',
      isImportant: false,
      postedBy: 'HOD Computer Science',
    },
  ];

  const filteredNotices = notices.filter(
    (n) => filter === 'All' || n.category === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">College Notice Board</h1>
          <p className="text-sm text-gray-400 mt-1">Official circulars, academic notices, and announcements</p>
        </div>

        <div className="flex bg-[#171d2b] p-1 rounded-xl border border-[#232a3b] self-start sm:self-auto">
          {['All', 'Examination', 'Academic', 'Fees', 'Events'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === cat
                  ? 'bg-[#079BB5] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-6 rounded-2xl bg-[#121622] border transition hover:border-[#079BB5]/50 flex flex-col justify-between ${
              notice.isImportant ? 'border-[#079BB5]/40 shadow-lg shadow-[#079BB5]/5' : 'border-[#232a3b]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#079BB5]/10 text-[#079BB5] border border-[#079BB5]/20">
                  {notice.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {notice.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {notice.isImportant && <Pin className="w-4 h-4 text-[#079BB5] shrink-0" />}
                <span>{notice.title}</span>
              </h3>

              <p className="text-sm text-gray-300 mt-2.5 leading-relaxed">
                {notice.content}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#232a3b] flex items-center justify-between text-xs text-gray-400">
              <span>Authority: {notice.postedBy}</span>
              <span className="text-[#079BB5] font-medium cursor-pointer hover:underline">Read Circular →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
