import React, { useState } from 'react';
import { FileText, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'ER Diagram & Relational Schema Design',
      subject: 'DBMS',
      faculty: 'Prof. S. Das',
      dueDate: '16 May 2026',
      status: 'Pending',
      marks: 'Pending',
    },
    {
      id: 2,
      title: 'CPU Scheduling Algorithms Simulation',
      subject: 'Operating System',
      faculty: 'Prof. P. Sahoo',
      dueDate: '10 May 2026',
      status: 'Submitted',
      marks: '19 / 20',
    },
    {
      id: 3,
      title: 'Subnetting & Socket Programming',
      subject: 'Computer Networks',
      faculty: 'Prof. A. Nayak',
      dueDate: '04 May 2026',
      status: 'Graded',
      marks: '18 / 20',
    },
    {
      id: 4,
      title: 'React Single Page Application',
      subject: 'Web Technology',
      faculty: 'Prof. K. Verma',
      dueDate: '20 May 2026',
      status: 'Pending',
      marks: 'Pending',
    },
  ]);

  const [activeUploadId, setActiveUploadId] = useState(null);

  const handleUpload = (id) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, status: 'Submitted' } : a))
    );
    toast.success('Assignment submitted successfully!');
    setActiveUploadId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Assignments</h1>
        <p className="text-sm text-gray-400 mt-1">Coursework tasks, submission portals, and grading evaluation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#121622] border border-[#232a3b] hover:border-[#079BB5]/40 transition shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#079BB5]/10 text-[#079BB5] border border-[#079BB5]/20">
                {item.subject}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  item.status === 'Graded' || item.status === 'Submitted'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Instructor: {item.faculty}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 py-2 border-y border-[#232a3b]/60">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Due: {item.dueDate}
              </span>
              <span>Marks: <strong className="text-white">{item.marks}</strong></span>
            </div>

            {item.status === 'Pending' ? (
              <div>
                <input
                  type="file"
                  id={`file-${item.id}`}
                  className="hidden"
                  onChange={() => handleUpload(item.id)}
                />
                <label
                  htmlFor={`file-${item.id}`}
                  className="w-full py-2.5 bg-[#079BB5] hover:bg-[#06849a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-[#079BB5]/20"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload & Submit Work</span>
                </label>
              </div>
            ) : (
              <div className="py-2.5 rounded-xl bg-[#171d2b] border border-[#232a3b] text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Work Verified & Recorded</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
