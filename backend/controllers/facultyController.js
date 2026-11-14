import Faculty from '../models/Faculty.js';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import Student from '../models/Student.js';

// @desc    Get Faculty Dashboard
// @route   GET /api/faculty/dashboard
// @access  Private (Faculty)
export const getFacultyDashboard = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user.id });
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty profile not found' });
    }

    const assignedSubjects = faculty.assignedSubjects || [
      { subjectName: 'Database Management Systems', subjectCode: 'CS601', semester: 6, type: 'Theory' },
      { subjectName: 'DBMS Laboratory', subjectCode: 'CS601L', semester: 6, type: 'Lab' },
      { subjectName: 'Advanced Web Applications', subjectCode: 'CS802', semester: 8, type: 'Theory' },
    ];

    res.json({
      success: true,
      data: {
        faculty: {
          name: req.user.name,
          email: req.user.email,
          employeeId: faculty.employeeId,
          department: faculty.department,
          designation: faculty.designation,
          avatar: req.user.avatar,
        },
        assignedSubjects,
        totalStudentsTaught: 120,
        classesToday: 2,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving faculty data', error: error.message });
  }
};

// @desc    Update Attendance for a subject
// @route   POST /api/faculty/attendance
// @access  Private (Faculty)
export const markAttendance = async (req, res) => {
  try {
    const { studentId, subject, status, date } = req.body;
    let attendance = await Attendance.findOne({ student: studentId, subject });

    if (!attendance) {
      attendance = new Attendance({
        student: studentId,
        subject,
        totalClasses: 1,
        presentClasses: status === 'Present' ? 1 : 0,
        absentClasses: status === 'Absent' ? 1 : 0,
        percentage: status === 'Present' ? 100 : 0,
        history: [{ date: date || new Date(), status, markedBy: req.user.name }],
      });
    } else {
      attendance.totalClasses += 1;
      if (status === 'Present') attendance.presentClasses += 1;
      else if (status === 'Absent') attendance.absentClasses += 1;
      attendance.percentage = (attendance.presentClasses / attendance.totalClasses) * 100;
      attendance.history.push({ date: date || new Date(), status, markedBy: req.user.name });
    }

    await attendance.save();
    res.json({ success: true, message: 'Attendance recorded', attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to record attendance', error: error.message });
  }
};
