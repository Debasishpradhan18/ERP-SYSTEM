import sequelize from '../../config/mysql.js';
import User from './User.js';
import Student from './Student.js';
import Faculty from './Faculty.js';
import Attendance from './Attendance.js';
import Timetable from './Timetable.js';
import Result from './Result.js';
import Fee from './Fee.js';
import Complaint from './Complaint.js';
import Notice from './Notice.js';

// Define MySQL Foreign Key Associations
User.hasOne(Student, { foreignKey: 'userId', as: 'student', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Faculty, { foreignKey: 'userId', as: 'faculty', onDelete: 'CASCADE' });
Faculty.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendance', onDelete: 'CASCADE' });
Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Student.hasMany(Result, { foreignKey: 'studentId', as: 'results', onDelete: 'CASCADE' });
Result.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Student.hasMany(Fee, { foreignKey: 'studentId', as: 'fees', onDelete: 'CASCADE' });
Fee.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Student.hasMany(Complaint, { foreignKey: 'studentId', as: 'complaints', onDelete: 'CASCADE' });
Complaint.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

export {
  sequelize,
  User,
  Student,
  Faculty,
  Attendance,
  Timetable,
  Result,
  Fee,
  Complaint,
  Notice,
};

export default {
  sequelize,
  User,
  Student,
  Faculty,
  Attendance,
  Timetable,
  Result,
  Fee,
  Complaint,
  Notice,
};
