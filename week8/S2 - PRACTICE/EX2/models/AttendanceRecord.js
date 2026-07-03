import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const AttendanceRecord = sequelize.define('AttendanceRecord', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Present'
  }
}, {
  timestamps: false
});

export default AttendanceRecord;
