import express from 'express';
import { sequelize, Student, Class, AttendanceRecord } from './models/index.js';

const app = express();
app.use(express.json());

// Helper function to seed initial data
async function seedDatabase() {
  await sequelize.sync({ force: true });
  console.log('Database synced.');

  // Create initial classes
  const classA = await Class.create({ name: 'Mathematics 101' });
  const classB = await Class.create({ name: 'Science 102' });

  // Create initial students
  const alice = await Student.create({ name: 'Alice Smith' });
  const bob = await Student.create({ name: 'Bob Jones' });
  const charlie = await Student.create({ name: 'Charlie Brown' });

  // Create some initial attendance records
  await AttendanceRecord.create({
    studentId: alice.id,
    classId: classA.id,
    date: '2025-06-16',
    status: 'Present'
  });
  await AttendanceRecord.create({
    studentId: bob.id,
    classId: classA.id,
    date: '2025-06-16',
    status: 'Absent'
  });
  await AttendanceRecord.create({
    studentId: charlie.id,
    classId: classA.id,
    date: '2025-06-16',
    status: 'Late'
  });

  console.log('Seeded database with initial classes, students, and records.');
}

// 1. POST 
app.post('/attendance', async (req, res) => {
  try {
    const studentId = req.query.studentId || req.body.studentId;
    const date = req.query.date || req.body.date;
    const classId = req.query.classId || req.body.classId || 1; // Default to class ID 1 if not specified
    const status = req.query.status || req.body.status || 'Present'; // Default to Present

    if (!studentId || !date) {
      return res.status(400).json({ error: 'studentId and date are required parameters.' });
    }

    // Verify Student and Class exist
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: `Student with ID ${studentId} not found.` });
    }
    const cls = await Class.findByPk(classId);
    if (!cls) {
      return res.status(404).json({ error: `Class with ID ${classId} not found.` });
    }

    // Find existing record or create a new one
    const [record, created] = await AttendanceRecord.findOrCreate({
      where: { studentId, classId, date },
      defaults: { status }
    });

    if (!created) {
      record.status = status;
      await record.save();
    }

    res.status(created ? 201 : 200).json({
      message: created ? 'Attendance marked successfully' : 'Attendance updated successfully',
      record
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET 
app.get('/attendance', async (req, res) => {
  try {
    const { studentId, date } = req.query;

    if (!studentId || !date) {
      return res.status(400).json({ error: 'studentId and date are required parameters.' });
    }

    const record = await AttendanceRecord.findOne({
      where: { studentId, date },
      include: [
        { model: Student, as: 'student' },
        { model: Class, as: 'class' }
      ]
    });

    if (!record) {
      return res.status(404).json({ message: 'No attendance record found for this student on this date.' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET 
app.get('/classes/:id/attendance', async (req, res) => {
  try {
    const classId = req.params.id;

    const cls = await Class.findByPk(classId);
    if (!cls) {
      return res.status(404).json({ error: `Class with ID ${classId} not found.` });
    }

    const records = await AttendanceRecord.findAll({
      where: { classId },
      include: [
        { model: Student, as: 'student' }
      ]
    });

    res.json({
      class: cls,
      attendance: records
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET 
app.get('/students/:id/attendance', async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: `Student with ID ${studentId} not found.` });
    }

    const records = await AttendanceRecord.findAll({
      where: { studentId },
      include: [
        { model: Class, as: 'class' }
      ]
    });

    const summary = {
      student,
      totalDays: records.length,
      presentCount: records.filter(r => r.status === 'Present').length,
      absentCount: records.filter(r => r.status === 'Absent').length,
      lateCount: records.filter(r => r.status === 'Late').length,
      history: records
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedDatabase();
});
