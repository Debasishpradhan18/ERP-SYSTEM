import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campus_erp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback Mock Data matching reference screenshots
export const mockStudentData = {
  student: {
    name: 'Debasish Pradhan',
    email: 'student@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    rollNumber: '22CSE088',
    department: 'Computer Science & Engineering',
    batch: 'B.Tech CSE | Final Year',
    course: 'B.Tech',
    currentSemester: 6,
    sgpa: 8.42,
    cgpa: 8.31,
    proctor: {
      name: 'Dr. Anand Sharma',
      phone: '+91 98765 43210',
      email: 'anand.sharma@campuserp.edu',
      cabin: 'Block B - Room 302',
    },
  },
  cards: {
    attendance: { title: 'Attendance', percentage: '81.67%', color: '#079BB5' },
    examination: { title: 'Examination', sgpa: 8.42, cgpa: 8.31, color: '#16A34A' },
    proctor: { title: 'Proctor', name: 'Dr. Anand Sharma', phone: '+91 98765 43210', color: '#64748B' },
    dueAmount: { title: 'Due Amount', dueAmount: 5000, color: '#DC3545' },
    timetable: { title: 'Timetable', todayTotal: 4, color: '#7C3AED' },
    raiseProblem: { title: 'Raise a Problem', activeTickets: 1, color: '#EA8000' },
  },
  attendanceOverview: {
    theory: 85,
    lab: 78,
    total: 82,
  },
  todayTimetable: [
    { id: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', time: '09:00 AM - 10:00 AM', type: 'Theory' },
    { id: 2, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', time: '10:00 AM - 11:00 AM', type: 'Theory' },
    { id: 3, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', time: '11:30 AM - 12:30 PM', type: 'Theory' },
  ],
};

export const mockAttendanceData = {
  summary: {
    totalClasses: 120,
    presentClasses: 98,
    absentClasses: 22,
    overallPercentage: '81.67%',
  },
  records: [
    { id: 1, subject: 'DBMS', type: 'Theory', total: 30, present: 26, absent: 4, percentage: '86.67%', status: 'Safe' },
    { id: 2, subject: 'Operating System', type: 'Theory', total: 30, present: 24, absent: 6, percentage: '80.00%', status: 'Safe' },
    { id: 3, subject: 'Computer Networks', type: 'Theory', total: 30, present: 22, absent: 8, percentage: '73.33%', status: 'Warning' },
    { id: 4, subject: 'Web Technology', type: 'Lab', total: 15, present: 12, absent: 3, percentage: '80.00%', status: 'Safe' },
    { id: 5, subject: 'DBMS Lab', type: 'Lab', total: 15, present: 14, absent: 1, percentage: '93.33%', status: 'Safe' },
  ],
};

export const mockExaminationData = {
  currentSemester: '6th Semester',
  sgpa: 8.42,
  cgpa: 8.31,
  results: [
    { id: 1, subject: 'DBMS', maxMarks: 100, marksObtained: 86, grade: 'A' },
    { id: 2, subject: 'Operating System', maxMarks: 100, marksObtained: 80, grade: 'A-' },
    { id: 3, subject: 'Computer Networks', maxMarks: 100, marksObtained: 78, grade: 'B+' },
    { id: 4, subject: 'Web Technology', maxMarks: 100, marksObtained: 88, grade: 'A' },
    { id: 5, subject: 'Software Engineering', maxMarks: 100, marksObtained: 82, grade: 'A-' },
  ],
  schedule: [
    { id: 1, subject: 'DBMS', date: '18 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall A' },
    { id: 2, subject: 'Operating System', date: '21 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall B' },
    { id: 3, subject: 'Computer Networks', date: '24 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall A' },
    { id: 4, subject: 'Web Technology', date: '27 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall C' },
  ],
  internalMarks: [
    { id: 1, subject: 'DBMS', test1: 28, test2: 29, assignment: 10, total: '48 / 50' },
    { id: 2, subject: 'Operating System', test1: 25, test2: 27, assignment: 9, total: '44 / 50' },
    { id: 3, subject: 'Computer Networks', test1: 24, test2: 26, assignment: 9, total: '43 / 50' },
    { id: 4, subject: 'Web Technology', test1: 29, test2: 28, assignment: 10, total: '49 / 50' },
  ],
};

export const mockTimetableData = {
  today: [
    { id: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', time: '09:00 - 10:00' },
    { id: 2, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', time: '10:00 - 11:00' },
    { id: 3, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', time: '11:30 - 12:30' },
    { id: 4, subject: 'CN Lab', faculty: 'Prof. A. Nayak', room: 'Lab 2', time: '02:00 - 04:00' },
  ],
  weekly: [
    { day: 'Monday', classes: [
      { id: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', time: '09:00 - 10:00' },
      { id: 2, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', time: '10:00 - 11:00' },
      { id: 3, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', time: '11:30 - 12:30' },
      { id: 4, subject: 'CN Lab', faculty: 'Prof. A. Nayak', room: 'Lab 2', time: '02:00 - 04:00' },
    ]},
    { day: 'Tuesday', classes: [
      { id: 1, subject: 'Computer Networks', faculty: 'Prof. A. Nayak', room: 'Room 204', time: '09:00 - 10:00' },
      { id: 2, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', time: '10:00 - 11:00' },
      { id: 3, subject: 'Web Technology', faculty: 'Prof. K. Verma', room: 'Room 302', time: '11:30 - 12:30' },
      { id: 4, subject: 'DBMS Lab', faculty: 'Prof. S. Das', room: 'Lab 1', time: '02:00 - 04:00' },
    ]},
    { day: 'Wednesday', classes: [
      { id: 1, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', time: '09:00 - 10:00' },
      { id: 2, subject: 'Software Engineering', faculty: 'Prof. M. Sen', room: 'Room 205', time: '10:00 - 11:00' },
      { id: 3, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', time: '11:30 - 12:30' },
    ]},
    { day: 'Thursday', classes: [
      { id: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', time: '09:00 - 10:00' },
      { id: 2, subject: 'Computer Networks', faculty: 'Prof. A. Nayak', room: 'Room 204', time: '10:00 - 11:00' },
      { id: 3, subject: 'Web Tech Lab', faculty: 'Prof. K. Verma', room: 'Lab 3', time: '02:00 - 04:00' },
    ]},
    { day: 'Friday', classes: [
      { id: 1, subject: 'Software Engineering', faculty: 'Prof. M. Sen', room: 'Room 205', time: '09:00 - 10:00' },
      { id: 2, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', time: '10:00 - 11:00' },
      { id: 3, subject: 'Seminar / Project', faculty: 'Prof. S. Das', room: 'Seminar Hall', time: '02:00 - 04:00' },
    ]},
  ],
};

export const mockFeeData = {
  totalFee: 60000,
  paidAmount: 55000,
  dueAmount: 5000,
  history: [
    { id: 1, purpose: 'Semester Fee (Sem 5)', amount: 30000, date: '10 Jan 2025', status: 'Paid' },
    { id: 2, purpose: 'Hostel Fee', amount: 25000, date: '15 Jan 2025', status: 'Paid' },
    { id: 3, purpose: 'Semester Fee (Sem 6)', amount: 5000, date: '-', status: 'Due' },
  ],
};

export const mockComplaintsData = [
  {
    _id: '1',
    ticketId: '#CMP1604',
    category: 'Attendance issue',
    title: 'Attendance not updated',
    description: 'My last two classes were marked absent, but I was present in the class. Please check and update my attendance.',
    priority: 'Medium',
    status: 'Under Review',
    createdAt: '2025-02-10',
  },
  {
    _id: '2',
    ticketId: '#CMP1307',
    category: 'Timetable Issue',
    title: 'Class room change request',
    description: 'Room 204 projector was not functional during DBMS class.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2025-01-28',
  },
  {
    _id: '3',
    ticketId: '#CMP0983',
    category: 'Fee issue',
    title: 'Fee payment receipt not downloaded',
    description: 'Semester 5 receipt was missing the official stamp.',
    priority: 'High',
    status: 'Resolved',
    createdAt: '2025-01-15',
  },
];

export const mockAdminStats = {
  stats: {
    totalStudents: '1,248',
    totalFaculty: '86',
    totalDepartments: '6',
    openComplaints: '14',
  },
  attendanceSummary: {
    present: 82,
    absent: 18,
  },
  complaintsOverview: [
    { name: 'Pending', count: 6, fill: '#EAB308' },
    { name: 'In Progress', count: 8, fill: '#3B82F6' },
    { name: 'Resolved', count: 22, fill: '#16A34A' },
    { name: 'Rejected', count: 3, fill: '#DC3545' },
  ],
};

export default api;
