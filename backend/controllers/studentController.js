import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import Timetable from '../models/Timetable.js';
import Result from '../models/Result.js';
import Fee from '../models/Fee.js';
import Complaint from '../models/Complaint.js';

// @desc    Get Student Dashboard Overview
// @route   GET /api/student/dashboard
// @access  Private (Student)
export const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    // Get attendance records
    const attendanceRecords = await Attendance.find({ student: student._id });
    const totalClasses = attendanceRecords.reduce((acc, curr) => acc + curr.totalClasses, 0) || 120;
    const presentClasses = attendanceRecords.reduce((acc, curr) => acc + curr.presentClasses, 0) || 98;
    const overallPercentage = totalClasses ? ((presentClasses / totalClasses) * 100).toFixed(2) : '81.67';

    // Get today's timetable
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = days[new Date().getDay()] === 'Sunday' ? 'Monday' : days[new Date().getDay()];
    let todayClasses = await Timetable.find({ day: todayDayName, semester: student.currentSemester }).sort({ periodNumber: 1 });

    if (!todayClasses.length) {
      todayClasses = await Timetable.find({ day: 'Monday' }).sort({ periodNumber: 1 });
    }

    // Open complaints count
    const openComplaintsCount = await Complaint.countDocuments({
      student: student._id,
      status: { $in: ['Submitted', 'Under Review', 'In Progress'] },
    });

    res.json({
      success: true,
      data: {
        student: {
          name: req.user.name,
          email: req.user.email,
          avatar: req.user.avatar,
          rollNumber: student.rollNumber,
          department: student.department,
          batch: student.batch,
          course: student.course,
          currentSemester: student.currentSemester,
          sgpa: student.sgpa,
          cgpa: student.cgpa,
          proctor: student.proctor,
        },
        cards: {
          attendance: {
            title: 'Attendance',
            percentage: overallPercentage,
            status: 'On Track',
            color: '#079BB5',
          },
          examination: {
            title: 'Examination',
            sgpa: student.sgpa,
            cgpa: student.cgpa,
            upcomingExams: 2,
            color: '#16A34A',
          },
          proctor: {
            title: 'Proctor',
            name: student.proctor.name,
            phone: student.proctor.phone,
            color: '#64748B',
          },
          dueAmount: {
            title: 'Due Amount',
            dueAmount: student.dueFee,
            totalFee: student.totalFee,
            paidFee: student.paidFee,
            color: '#DC3545',
          },
          timetable: {
            title: 'Timetable',
            todayTotal: todayClasses.length,
            color: '#7C3AED',
          },
          raiseProblem: {
            title: 'Raise a Problem',
            activeTickets: openComplaintsCount,
            color: '#EA8000',
          },
        },
        attendanceOverview: {
          theory: 85,
          lab: 78,
          total: 82,
        },
        todayTimetable: todayClasses.map((item) => ({
          id: item._id,
          subject: item.subject,
          faculty: item.faculty,
          room: item.room,
          time: `${item.startTime} - ${item.endTime}`,
          type: item.type,
        })),
      },
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ success: false, message: 'Error retrieving student dashboard data', error: error.message });
  }
};

// @desc    Get Detailed Attendance
// @route   GET /api/student/attendance
// @access  Private (Student)
export const getStudentAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const records = await Attendance.find({ student: student._id });

    const totalClasses = records.reduce((acc, curr) => acc + curr.totalClasses, 0);
    const presentClasses = records.reduce((acc, curr) => acc + curr.presentClasses, 0);
    const absentClasses = records.reduce((acc, curr) => acc + curr.absentClasses, 0);
    const overallPercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : '81.67';

    res.json({
      success: true,
      summary: {
        totalClasses: totalClasses || 120,
        presentClasses: presentClasses || 98,
        absentClasses: absentClasses || 22,
        overallPercentage: overallPercentage,
      },
      records: records.map((r) => ({
        id: r._id,
        subject: r.subject,
        type: r.type,
        total: r.totalClasses,
        present: r.presentClasses,
        absent: r.absentClasses,
        percentage: `${r.percentage.toFixed(2)}%`,
        status: r.percentage >= 75 ? 'Safe' : r.percentage >= 65 ? 'Warning' : 'Critical',
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching attendance', error: error.message });
  }
};

// @desc    Get Examination Details & Results
// @route   GET /api/student/examination
// @access  Private (Student)
export const getStudentExamination = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const result = await Result.findOne({ student: student._id, semester: student.currentSemester });

    const examSchedule = [
      { id: 1, subject: 'DBMS', code: 'CS601', date: '18 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall A' },
      { id: 2, subject: 'Operating System', code: 'CS602', date: '21 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall B' },
      { id: 3, subject: 'Computer Networks', code: 'CS603', date: '24 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall A' },
      { id: 4, subject: 'Web Technology', code: 'CS604', date: '27 May 2026', time: '10:00 AM - 01:00 PM', room: 'Hall C' },
    ];

    res.json({
      success: true,
      currentSemester: student.currentSemester,
      sgpa: result ? result.sgpa : student.sgpa,
      cgpa: result ? result.cgpa : student.cgpa,
      schedule: examSchedule,
      results: result ? result.scores : [
        { subject: 'DBMS', maxMarks: 100, marksObtained: 86, grade: 'A', internalMarks: 28, externalMarks: 58 },
        { subject: 'Operating System', maxMarks: 100, marksObtained: 80, grade: 'A-', internalMarks: 26, externalMarks: 54 },
        { subject: 'Computer Networks', maxMarks: 100, marksObtained: 78, grade: 'B+', internalMarks: 25, externalMarks: 53 },
        { subject: 'Web Technology', maxMarks: 100, marksObtained: 88, grade: 'A', internalMarks: 29, externalMarks: 59 },
        { subject: 'Software Engineering', maxMarks: 100, marksObtained: 82, grade: 'A-', internalMarks: 27, externalMarks: 55 },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching exam details', error: error.message });
  }
};

// @desc    Get Timetable
// @route   GET /api/student/timetable
// @access  Private (Student)
export const getStudentTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const timetable = await Timetable.find({ semester: student.currentSemester }).sort({ day: 1, periodNumber: 1 });

    res.json({
      success: true,
      timetable,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching timetable', error: error.message });
  }
};

// @desc    Get Fee Details
// @route   GET /api/student/fees
// @access  Private (Student)
export const getStudentFees = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const feeRecord = await Fee.findOne({ student: student._id });

    res.json({
      success: true,
      totalFee: feeRecord ? feeRecord.totalFee : 60000,
      paidAmount: feeRecord ? feeRecord.paidAmount : 55000,
      dueAmount: feeRecord ? feeRecord.dueAmount : 5000,
      dueDate: feeRecord ? feeRecord.dueDate : '30 Apr 2026',
      history: feeRecord ? feeRecord.history : [
        { id: 1, purpose: 'Semester Fee (Sem 5)', amount: 30000, date: '10 Jan 2025', status: 'Paid' },
        { id: 2, purpose: 'Hostel Fee', amount: 25000, date: '15 Jan 2025', status: 'Paid' },
        { id: 3, purpose: 'Semester Fee (Sem 6)', amount: 5000, date: '-', status: 'Due' },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching fees', error: error.message });
  }
};
