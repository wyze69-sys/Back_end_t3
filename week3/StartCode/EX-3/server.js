import express from 'express';
import courses from './courses.js';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;

app.use(logger);

app.get('/departments/:dept/courses', validateQuery, auth, (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;

  const min = minCredits ? Number(minCredits) : null;
  const max = maxCredits ? Number(maxCredits) : null;

  let results = courses.filter(course =>
    course.department.toLowerCase() === dept.toLowerCase()
  );

  if (level) {
    results = results.filter(course =>
      course.level.toLowerCase() === level.toLowerCase()
    );
  }

  if (semester) {
    results = results.filter(course =>
      course.semester.toLowerCase() === semester.toLowerCase()
    );
  }

  if (min !== null) {
    results = results.filter(course => course.credits >= min);
  }

  if (max !== null) {
    results = results.filter(course => course.credits <= max);
  }

  if (instructor) {
    results = results.filter(course =>
      course.instructor.toLowerCase().includes(instructor.toLowerCase())
    );
  }

  res.json({
    results,
    meta: {
      total: results.length
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});