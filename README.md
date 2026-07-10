# Back End T3 — Weekly Assignments

This repository contains independent Back End Term 3 assignments. Each weekly folder keeps its own source code and package files so it can be reviewed or run separately.

## Assignment folders

- **week1** — Node.js fundamentals: classes, modules, and JSON file handling.
- **week2** — Basic Express servers and request handling exercises.
- **week3** — Express routes, middleware, authentication, and query validation.
- **week4** — MVC-style Express API exercises for users and articles.
- **week5** — React/Vite news-client exercises with article viewing, creation, updates, and filters.
- **week6** — Full-stack article application with separate Express backend, React frontend, and SQL database script.
- **week8** — Sequelize practice:
  - `S2 - PRACTICE/EX1` — Author and Book one-to-many relationship.
  - `S2 - PRACTICE/EX2` — Attendance Tracker REST API and Sequelize relationships.
- **week9** — School Management API using Express, Sequelize, MySQL, Faker seed data, CRUD routes, and course pagination.

## How to run an assignment

Each assignment is independent. Open a terminal inside the assignment folder that contains its own `package.json`.

```bash
npm install
```

Then use the script available in that folder, such as:

```bash
npm run dev
npm start
npm run build
```

## Week 6

Week 6 has two separate applications:

```text
week6/Start Code/back   # Express backend
week6/Start Code/front  # React/Vite frontend
```

Install and run each folder separately. The SQL setup script is:

```text
week6/Start Code/database_ex3_ex4.sql
```

## Week 8

The Sequelize exercises use local SQLite database files that are included with each exercise:

```text
week8/S2 - PRACTICE/EX1
week8/S2 - PRACTICE/EX2
```

## Week 9

Week 9 uses MySQL. Before running it:

1. Copy `.env.example` to `.env` inside `week9/START-CODE`.
2. Set the MySQL connection values.
3. Create the configured database.
4. Run the following commands:

```bash
cd "week9/START-CODE"
npm install
npm run seed
npm run dev
```

The API documentation is available at:

```text
http://localhost:3000/docs/
```

## Repository hygiene

The root `.gitignore` prevents local-only files from being committed, including:

```text
node_modules/
.env
.env.*
dist/
__MACOSX/
.DS_Store
```
