import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  sequelize,
  User,
  Student,
  Attendance,
  Timetable,
  Result,
  Fee,
  Complaint,
  Notice,
} from '../models/sql/index.js';
import { initializeDatabase } from '../config/mysql.js';

dotenv.config();

const seedMySQL = async () => {
  try {
    console.log('🐬 Initializing MySQL database...');
    await initializeDatabase();
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL Server!');

    // Re-create all tables cleanly
    await sequelize.sync({ force: true });
    console.log('🧹 Cleaned and synchronized all MySQL tables.');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Users
    const studentUser = await User.create({
      name: 'Debasish Pradhan',
      email: 'student@campus.edu',
      password: hashedPassword,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 91234 56789',
    });

    const facultyUser = await User.create({
      name: 'Prof. S. Das',
      email: 'faculty@campus.edu',
      password: hashedPassword,
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 98765 43210',
    });

    const adminUser = await User.create({
      name: 'Chief Administrator',
      email: 'admin@campus.edu',
      password: hashedPassword,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      phoneNumber: '+91 90000 11111',
    });

    // 2. Create Student Record
    const student = await Student.create({
      userId: studentUser.id,
      rollNumber: '22CSE088',
      registrationNumber: 'REG-2022-CSE-088',
      course: 'B.Tech',
      department: 'Computer Science & Engineering',
      currentSemester: 6,
      batch: 'Final Year',
      sgpa: 8.42,
      cgpa: 8.31,
      totalFee: 60000.00,
      paidFee: 55000.00,
      dueFee: 5000.00,
      proctorName: 'Dr. Anand Sharma',
      proctorEmail: 'anand.sharma@campuserp.edu',
      proctorPhone: '+91 98765 43210',
      proctorDepartment: 'Computer Science & Engineering',
      proctorCabin: 'Block B - Room 302',
    });

    // 3. Create Attendance Records
    await Attendance.bulkCreate([
      { studentId: student.id, subject: 'DBMS', type: 'Theory', totalClasses: 30, presentClasses: 26, absentClasses: 4, percentage: 86.67 },
      { studentId: student.id, subject: 'Operating System', type: 'Theory', totalClasses: 30, presentClasses: 24, absentClasses: 6, percentage: 80.00 },
      { studentId: student.id, subject: 'Computer Networks', type: 'Theory', totalClasses: 30, presentClasses: 22, absentClasses: 8, percentage: 73.33 },
      { studentId: student.id, subject: 'Web Technology', type: 'Lab', totalClasses: 15, presentClasses: 12, absentClasses: 3, percentage: 80.00 },
      { studentId: student.id, subject: 'DBMS Lab', type: 'Lab', totalClasses: 15, presentClasses: 14, absentClasses: 1, percentage: 93.33 },
    ]);

    // 4. Create Timetable
    await Timetable.bulkCreate([
      { day: 'Monday', periodNumber: 1, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory', semester: 6 },
      { day: 'Monday', periodNumber: 2, subject: 'Java', faculty: 'Prof. R. Mishra', room: 'Room 205', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory', semester: 6 },
      { day: 'Monday', periodNumber: 3, subject: 'Operating System', faculty: 'Prof. P. Sahoo', room: 'Room 301', startTime: '11:30 AM', endTime: '12:30 PM', type: 'Theory', semester: 6 },
      { day: 'Monday', periodNumber: 4, subject: 'CN Lab', faculty: 'Prof. A. Nayak', room: 'Lab 2', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Lab', semester: 6 },
      { day: 'Tuesday', periodNumber: 1, subject: 'Computer Networks', faculty: 'Prof. A. Nayak', room: 'Room 204', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Theory', semester: 6 },
      { day: 'Tuesday', periodNumber: 2, subject: 'DBMS', faculty: 'Prof. S. Das', room: 'Room 204', startTime: '10:00 AM', endTime: '11:00 AM', type: 'Theory', semester: 6 },
      { day: 'Tuesday', periodNumber: 3, subject: 'Web Technology', faculty: 'Prof. K. Verma', room: 'Room 302', startTime: '11:30 AM', endTime: '12:30 PM', type: 'Theory', semester: 6 },
      { day: 'Tuesday', periodNumber: 4, subject: 'DBMS Lab', faculty: 'Prof. S. Das', room: 'Lab 1', startTime: '02:00 PM', endTime: '04:00 PM', type: 'Lab', semester: 6 },
    ]);

    // 5. Create Results
    await Result.bulkCreate([
      { studentId: student.id, semester: 6, subject: 'DBMS', maxMarks: 100, marksObtained: 86, grade: 'A' },
      { studentId: student.id, semester: 6, subject: 'Operating System', maxMarks: 100, marksObtained: 80, grade: 'A-' },
      { studentId: student.id, semester: 6, subject: 'Computer Networks', maxMarks: 100, marksObtained: 78, grade: 'B+' },
      { studentId: student.id, semester: 6, subject: 'Web Technology', maxMarks: 100, marksObtained: 88, grade: 'A' },
      { studentId: student.id, semester: 6, subject: 'Software Engineering', maxMarks: 100, marksObtained: 82, grade: 'A-' },
    ]);

    // 6. Create Fees
    await Fee.bulkCreate([
      { studentId: student.id, purpose: 'Semester Fee (Sem 5)', amount: 30000.00, date: '10 Jan 2025', status: 'Paid' },
      { studentId: student.id, purpose: 'Hostel Fee', amount: 25000.00, date: '15 Jan 2025', status: 'Paid' },
      { studentId: student.id, purpose: 'Semester Fee (Sem 6)', amount: 5000.00, date: '-', status: 'Due' },
    ]);

    // 7. Create Complaints
    await Complaint.bulkCreate([
      {
        ticketId: '#CMP1604',
        studentId: student.id,
        category: 'Attendance Issue',
        title: 'Attendance not updated',
        description: 'My last two classes were marked absent, but I was present in the class. Please check and update my attendance.',
        priority: 'Medium',
        status: 'Under Review',
      },
      {
        ticketId: '#CMP1307',
        studentId: student.id,
        category: 'Timetable Issue',
        title: 'Class room change request',
        description: 'Room 204 projector was not functional during DBMS class.',
        priority: 'Low',
        status: 'Resolved',
        adminResponse: 'Projector has been serviced by IT staff.',
      },
      {
        ticketId: '#CMP0983',
        studentId: student.id,
        category: 'Fee Issue',
        title: 'Fee payment receipt not downloaded',
        description: 'Semester 5 receipt was missing the official stamp.',
        priority: 'High',
        status: 'Resolved',
        adminResponse: 'Signed receipt updated and available in Due Amount section.',
      },
    ]);

    console.log('🎉 [MySQL]: Successfully seeded all tables for Campus ERP!');
    console.log('----------------------------------------------------');
    console.log('Student Login:  student@campus.edu  / password123');
    console.log('Faculty Login:  faculty@campus.edu  / password123');
    console.log('Admin Login:    admin@campus.edu    / password123');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('❌ [MySQL Seed Error]:', err.message);
    process.exit(1);
  }
};

seedMySQL();
