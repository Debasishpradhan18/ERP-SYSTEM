import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Complaint = sequelize.define('Complaint', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticketId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  status: {
    type: DataTypes.ENUM('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected'),
    defaultValue: 'Under Review',
  },
  attachment: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  adminResponse: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
}, {
  tableName: 'complaints',
  timestamps: true,
});

export default Complaint;
