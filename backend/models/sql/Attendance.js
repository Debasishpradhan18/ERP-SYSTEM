import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subjectCode: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  type: {
    type: DataTypes.ENUM('Theory', 'Lab'),
    defaultValue: 'Theory',
  },
  totalClasses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  presentClasses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  absentClasses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
  },
}, {
  tableName: 'attendance',
  timestamps: true,
});

export default Attendance;
