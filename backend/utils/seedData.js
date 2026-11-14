import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Attendance from '../models/Attendance.js';
import Timetable from '../models/Timetable.js';
import Result from '../models/Result.js';
import Fee from '../models/Fee.js';
import Complaint from '../models/Complaint.js';
import Notice from '../models/Notice.js';

dotenv.config();

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus_erp');
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Student.deleteMany();
    await Faculty.deleteMany();
    await Attendance.deleteMany();
    await Timetable.deleteMany();
    await Result.deleteMany();
    await Fee.deleteMany();
    await Complaint.deleteMany();
    await Notice.deleteMany();

    console.log('🧹 Cleared existing data.');

    // 1. Create Users
    const studentUser = await User.create({
      name: 'Debasish Pradhan',
      email: 'student@campus.edu',
      password: 'password123',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 91234 56789',
    });

    const facultyUser = await User.create({
      name: 'Prof. S. Das',
      email: 'faculty@campus.edu',
      password: 'password123',
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 98765 43210',
    });

    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@campus.edu',
      password: 'password123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 90000 11111',
    });

    // 2. Create Student Profile
    const student = await Student.create({
      user: studentUser._id,
      rollNumber: '22CSE088',
      registrationNumber: 'REG-2022-CSE-088',
      course: 'B.Tech',
      department: 'Computer Science & Engineering',
      currentSemester: 6,
      batch: 'Final Year',
      sgpa: 8.42,
      cgpa: 8.31,
      totalFee: 60000,
      paidFee: 55000,
      dueFee: 5000,
      proctor: {
        name: 'Dr. Anand Sharma',
        email: 'anand.sharma@campuserp.edu',
        phone: '+91 98765 43210',
        department: 'Computer Science & Engineering',
        cabin: 'Block B - Room 302',
      },
    });

    // 3. Create Faculty Profile
    await Faculty.create({
      user: facultyUser._id,
      employeeId: 'FAC-CSE-042',
      department: 'Computer Science & Engineering',
      designation: 'Associate Professor',
      assignedSubjects: [
        { subjectName: 'DBMS', subjectCode: 'CS601', semester: 6, type: 'Theory' },
        { subjectName: 'DBMS Lab', subjectCode: 'CS601L', semester: 6, type: 'Lab' },
      ],
    });

    // 4. Create Attendance Records matching screenshot
    const attendances = [
      { subject: 'DBMS', type: 'Theory', totalClasses: 30, presentClasses: 26, absentClasses: 4, percentage: 86.67 },
      { subject: 'Operating System', type: 'Theory', totalClasses: 30, presentClasses: 24, absentClasses: 6, percentage: 80.00 },
      { subject: 'Computer Networks', type: 'Theory', totalClasses: 30, presentClasses: 22, absentClasses: 8, percentage: 73.33 },
      { subject: 'Web Technology', type: 'Lab', totalClasses: 15, presentClasses: 12, absentClasses: 3, percentage: 80.00 },
      { subject: 'DBMS Lab', type: 'Lab', totalClasses: 15, presentClasses: 14, absentClasses: 1, percentage: 93.33 },
    ];

    for (const att of attendances) {
      await Attendance.create({
        student: student._id,
        ...att,
      });
    }

    // 5. Create Timetable records matching screenshot
    const timetableData = [
      { day: 'Monday', periodNumber: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory' },
      { day: 'Monday', periodNumber: 2, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory' },
      { day: 'Monday', periodNumber: 3, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', startTime: '11:30 AM', endTime: '12:30 PM', type: 'Theory' },
      { day: 'Monday', periodNumber: 4, subject: 'CN Lab', faculty: 'Prof. A. Nayak', room: 'Lab 2', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Lab' },

      { day: 'Tuesday', periodNumber: 1, subject: 'Computer Networks', faculty: 'Prof. A. Nayak', room: 'Room 204', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory' },
      { day: 'Tuesday', periodNumber: 2, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory' },
      { day: 'Tuesday', periodNumber: 3, subject: 'Web Technology', faculty: 'Prof. K. Verma', room: 'Room 302', startTime: '11:30 AM', endTime: '12:30 PM', type: 'Theory' },
      { day: 'Tuesday', periodNumber: 4, subject: 'DBMS Lab', faculty: 'Prof. S. Das', room: 'Lab 1', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Lab' },

      { day: 'Wednesday', periodNumber: 1, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory' },
      { day: 'Wednesday', periodNumber: 2, subject: 'Software Engineering', faculty: 'Prof. M. Sen', room: 'Room 205', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory' },
      { day: 'Wednesday', periodNumber: 3, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', startTime: '11:30 AM', endTime: '12:30 PM', type: 'Theory' },

      { day: 'Thursday', periodNumber: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory' },
      { day: 'Thursday', periodNumber: 2, subject: 'Computer Networks', faculty: 'Prof. A. Nayak', room: 'Room 204', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory' },
      { day: 'Thursday', periodNumber: 3, subject: 'Web Technology Lab', faculty: 'Prof. K. Verma', room: 'Lab 3', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Lab' },

      { day: 'Friday', periodNumber: 1, subject: 'Software Engineering', faculty: 'Prof. M. Sen', room: 'Room 205', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory' },
      { day: 'Friday', periodNumber: 2, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory' },
      { day: 'Friday', periodNumber: 3, subject: 'Seminar / Project', faculty: 'Prof. S. Das', room: 'Seminar Hall', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Theory' },
    ];

    await Timetable.insertMany(timetableData);

    // 6. Create Semester Results matching screenshot
    await Result.create({
      student: student._id,
      semester: 6,
      academicYear: '2025-2026',
      sgpa: 8.42,
      cgpa: 8.31,
      scores: [
        { subject: 'DBMS', maxMarks: 100, marksObtained: 86, grade: 'A', internalMarks: 28, externalMarks: 58 },
        { subject: 'Operating System', maxMarks: 100, marksObtained: 80, grade: 'A-', internalMarks: 26, externalMarks: 54 },
        { subject: 'Computer Networks', maxMarks: 100, marksObtained: 78, grade: 'B+', internalMarks: 25, externalMarks: 53 },
        { subject: 'Web Technology', maxMarks: 100, marksObtained: 88, grade: 'A', internalMarks: 29, externalMarks: 59 },
        { subject: 'Software Engineering', maxMarks: 100, marksObtained: 82, grade: 'A-', internalMarks: 27, externalMarks: 55 },
      ],
    });

    // 7. Create Fee Record matching screenshot
    await Fee.create({
      student: student._id,
      semester: 6,
      totalFee: 60000,
      paidAmount: 55000,
      dueAmount: 5000,
      dueDate: '30 Apr 2026',
      history: [
        { purpose: 'Semester Fee (Sem 5)', amount: 30000, date: '10 Jan 2025', status: 'Paid', transactionId: 'TXN-98412' },
        { purpose: 'Hostel Fee', amount: 25000, date: '15 Jan 2025', status: 'Paid', transactionId: 'TXN-98934' },
        { purpose: 'Semester Fee (Sem 6)', amount: 5000, date: '-', status: 'Due' },
      ],
    });

    // 8. Create Complaints matching screenshot
    await Complaint.create([
      {
        ticketId: '#CMP1604',
        student: student._id,
        category: 'Attendance Issue',
        title: 'Attendance not updated',
        description: 'My last two classes were marked absent, but I was present in the class. Please check and update my attendance.',
        priority: 'Medium',
        status: 'Under Review',
      },
      {
        ticketId: '#CMP1307',
        student: student._id,
        category: 'Timetable Issue',
        title: 'Class room change request',
        description: 'Room 204 projector was not functional during DBMS class.',
        priority: 'Low',
        status: 'Resolved',
        resolvedAt: new Date(),
        adminResponse: 'Projector has been serviced by IT staff.',
      },
      {
        ticketId: '#CMP0983',
        student: student._id,
        category: 'Fee Issue',
        title: 'Fee payment receipt not downloaded',
        description: 'Semester 5 receipt was missing the official stamp.',
        priority: 'High',
        status: 'Resolved',
        resolvedAt: new Date(),
        adminResponse: 'Signed receipt updated and available in Due Amount section.',
      },
    ]);

    // 9. Create College Notices
    await Notice.create([
      {
        title: 'Mid-Semester Examination Schedule Announced',
        category: 'Examination',
        content: 'The 6th Semester Mid-Term Examinations will commence from 18th May 2026. Students are requested to check the schedule tab.',
        isImportant: true,
      },
      {
        title: 'Campus Placement Drive - Tech Mahindra & Infosys',
        category: 'Events',
        content: 'Final Year B.Tech students are eligible for the upcoming campus recruitment drive next week.',
        isImportant: true,
      },
      {
        title: 'Submission of Final Year Project Synopses',
        category: 'Academic',
        content: 'All project groups must submit their initial synopsis signed by their respective proctor before Friday.',
        isImportant: false,
      },
    ]);

    console.log('✅ Demo Data Seeded Successfully!');
    console.log('----------------------------------------------------');
    console.log('Credentials:');
    console.log('Student Login:  student@campus.edu  / password123');
    console.log('Faculty Login:  faculty@campus.edu  / password123');
    console.log('Admin Login:    admin@campus.edu    / password123');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedAll();
