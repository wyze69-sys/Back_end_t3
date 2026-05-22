const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const submissionsFile = path.join(__dirname, 'submissions.txt');

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
  res.send(`
    <form method="POST" action="/contact">
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/contact', (req, res) => {
  const name = req.body.name;

  console.log('Submitted name:', name);

  fs.appendFile(submissionsFile, name + '\n', error => {
    if (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }

    res.send(`
      <html>
        <body>
          <h1>Thank you!</h1>
          <p>Your name has been submitted successfully.</p>
          <a href="/contact">Go back</a>
        </body>
      </html>
    `);
  });
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});