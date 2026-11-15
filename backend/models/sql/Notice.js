import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Notice = sequelize.define('Notice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Academic', 'Examination', 'Fees', 'Events', 'General'),
    defaultValue: 'Academic',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  postedBy: {
    type: DataTypes.STRING,
    defaultValue: 'Academic Office',
  },
  isImportant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'notices',
  timestamps: true,
});

export default Notice;
