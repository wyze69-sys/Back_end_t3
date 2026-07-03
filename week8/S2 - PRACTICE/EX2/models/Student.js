import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Student;
