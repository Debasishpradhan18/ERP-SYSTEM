import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.js';

const Fee = sequelize.define('Fee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('Paid', 'Due', 'Pending'),
    defaultValue: 'Paid',
  },
  receiptUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  tableName: 'fees',
  timestamps: true,
});

export default Fee;
