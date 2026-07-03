import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Class = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Class;
