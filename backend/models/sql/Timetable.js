import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  day: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    allowNull: false,
  },
  periodNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Theory', 'Lab'),
    defaultValue: 'Theory',
  },
  semester: {
    type: DataTypes.INTEGER,
    defaultValue: 6,
  },
  department: {
    type: DataTypes.STRING,
    defaultValue: 'Computer Science & Engineering',
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'timetable',
  timestamps: true,
});

export default Timetable;
