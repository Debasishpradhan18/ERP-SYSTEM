import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Faculty = sequelize.define('Faculty', {
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
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    defaultValue: 'Computer Science & Engineering',
  },
  designation: {
    type: DataTypes.STRING,
    defaultValue: 'Assistant Professor',
  },
  qualification: {
    type: DataTypes.STRING,
    defaultValue: 'Ph.D. in Computer Science',
  },
}, {
  tableName: 'faculty',
  timestamps: true,
});

export default Faculty;
