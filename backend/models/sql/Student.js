import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  rollNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  course: {
    type: DataTypes.STRING,
    defaultValue: 'B.Tech',
  },
  department: {
    type: DataTypes.STRING,
    defaultValue: 'Computer Science & Engineering',
  },
  currentSemester: {
    type: DataTypes.INTEGER,
    defaultValue: 6,
  },
  batch: {
    type: DataTypes.STRING,
    defaultValue: 'Final Year',
  },
  sgpa: {
    type: DataTypes.DECIMAL(4, 2),
    defaultValue: 8.42,
  },
  cgpa: {
    type: DataTypes.DECIMAL(4, 2),
    defaultValue: 8.31,
  },
  proctorName: {
    type: DataTypes.STRING,
    defaultValue: 'Dr. Anand Sharma',
  },
  proctorEmail: {
    type: DataTypes.STRING,
    defaultValue: 'anand.sharma@campuserp.edu',
  },
  proctorPhone: {
    type: DataTypes.STRING,
    defaultValue: '+91 98765 43210',
  },
  proctorDepartment: {
    type: DataTypes.STRING,
    defaultValue: 'Computer Science & Engineering',
  },
  proctorCabin: {
    type: DataTypes.STRING,
    defaultValue: 'Block B - 302',
  },
  totalFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 60000.00,
  },
  paidFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 55000.00,
  },
  dueFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 5000.00,
  },
}, {
  tableName: 'students',
  timestamps: true,
});

export default Student;
