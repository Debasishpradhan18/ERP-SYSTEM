import React, { useState, useEffect } from 'react';
import { MessageSquare, Upload, Send, AlertCircle, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import api, { mockComplaintsData } from '../../services/api';
import toast from 'react-hot-toast';

const RaiseProblem = () => {
  const [complaints, setComplaints] = useState(mockComplaintsData);
  const [category, setCategory] = useState('Attendance Issue');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my');
        if (res.data.success && res.data.complaints?.length) {
          setComplaints(res.data.complaints);
        }
      } catch (err) {
        console.warn('Using local complaints:', err.message);
      }
    };
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Please enter problem title and detailed description');
      return;
    }

    setSubmitting(true);
    const newTicketId = `#CMP${Math.floor(1000 + Math.random() * 9000)}`;

    const newComplaint = {
      _id: Date.now().toString(),
      ticketId: newTicketId,
      category,
      title,
      description,
      priority,
      status: 'Under Review',
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('priority', priority);
      if (file) formData.append('attachment', file);

      await api.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.warn('Backend unavailable, saved locally:', err.message);
    }

    setComplaints([newComplaint, ...complaints]);
    toast.success(`Complaint registered! Ticket ID: ${newTicketId}`);
    setTitle('');
    setDescription('');
    setFile(null);
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Raise a Problem</h1>
        <p className="text-sm text-gray-400 mt-1">Submit formal student grievances, disputes, or IT support tickets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side: Submission Form matching reference screenshot */}
        <div className="lg:col-span-3 bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">Submit New Ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#079BB5]"
              >
                <option value="Attendance Issue">Attendance Issue</option>
                <option value="Fee Issue">Fee Issue</option>
                <option value="Timetable Issue">Timetable Issue</option>
                <option value="Faculty Issue">Faculty Issue</option>
                <option value="Examination Issue">Examination Issue</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Hostel Issue">Hostel Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Problem Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Attendance not updated"
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#079BB5]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="My last two classes were marked absent, but I was present in the class. Please check and update my attendance."
                className="w-full bg-[#171d2b] border border-[#232a3b] rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#079BB5] h-28"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Upload Attachment (Optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#171d2b] file:text-[#079BB5] hover:file:bg-[#232a3b] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Priority
              </label>
              <div className="flex items-center gap-6">
                {['Low', 'Medium', 'High'].map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                      className="text-[#079BB5] focus:ring-0"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#7C3AED]/20 flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Complaint'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: My Complaints matching reference screenshot */}
        <div className="lg:col-span-2 bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#232a3b]">
            <h2 className="text-lg font-bold text-white">My Complaints</h2>
            <span className="text-xs bg-[#079BB5]/20 text-[#079BB5] px-2.5 py-1 rounded-full font-semibold">
              {complaints.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {complaints.map((c) => {
              const isExpanded = expandedId === c._id || expandedId === c.ticketId;
              let statusBadge = 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
              if (c.status === 'Resolved') {
                statusBadge = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
              } else if (c.status === 'Rejected') {
                statusBadge = 'bg-red-500/10 text-red-400 border border-red-500/30';
              }

              return (
                <div
                  key={c._id || c.ticketId}
                  className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] hover:border-[#079BB5]/40 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#079BB5]">{c.ticketId}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${statusBadge}`}>
                      {c.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{c.category}</p>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 mt-1">{c.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#232a3b]/60 text-[11px] text-gray-400">
                    <span>Priority: {c.priority}</span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : (c._id || c.ticketId))}
                      className="text-[#079BB5] hover:underline flex items-center gap-0.5 font-medium"
                    >
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-2 text-xs text-gray-300 space-y-2 bg-[#0e121a] p-3 rounded-lg border border-[#232a3b]">
                      <p><strong className="text-gray-400">Full Description:</strong> {c.description}</p>
                      {c.adminResponse && (
                        <p className="text-emerald-400">
                          <strong>Admin Response:</strong> {c.adminResponse}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseProblem;
