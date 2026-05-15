// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const submissionsFile = path.join(__dirname, 'submissions.txt');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const name = params.get('name');

            console.log('Submitted name:', name);

            fs.appendFile(submissionsFile, name + '\n', error => {
                if (error) {
                    console.error(error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Server error');
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`
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

        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
