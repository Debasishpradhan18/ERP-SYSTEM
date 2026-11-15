import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    defaultValue: 6,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  marksObtained: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  internalMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 28,
  },
  externalMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 58,
  },
}, {
  tableName: 'results',
  timestamps: true,
});

export default Result;
