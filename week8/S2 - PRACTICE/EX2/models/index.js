import sequelize from '../database.js';
import Student from './Student.js';
import Class from './Class.js';
import AttendanceRecord from './AttendanceRecord.js';

// Setup relationships

Student.hasMany(AttendanceRecord, { foreignKey: 'studentId', as: 'attendanceRecords' });
AttendanceRecord.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Class.hasMany(AttendanceRecord, { foreignKey: 'classId', as: 'attendanceRecords' });
AttendanceRecord.belongsTo(Class, { foreignKey: 'classId', as: 'class' });

export { sequelize, Student, Class, AttendanceRecord };
