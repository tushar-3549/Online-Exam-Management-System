# Online Exam Management System (FastAPI + React)

This repository contains a minimal but complete implementation of the assignment:

- `backend/` – FastAPI, SQLAlchemy, PostgreSQL, JWT auth
- `frontend/` – React + Vite
- `sample_questions.xlsx` – Example Excel for question import

## Quick Start

### 1. Database (PostgreSQL + DBeaver)

1. Open **DBeaver** and connect to your local PostgreSQL server.
2. Run this SQL:

   ```sql
   CREATE DATABASE online_exam;
   CREATE USER exam_user WITH PASSWORD 'exam_password';
   GRANT ALL PRIVILEGES ON DATABASE online_exam TO exam_user;
   ```

3. Make sure the connection URL matches in `backend/.env`:

   ```env
   DATABASE_URL=postgresql://exam_user:exam_password@localhost:5432/online_exam
   ```

### 2. Backend

```bash
cd backend
cp .env.example .env   # edit if needed
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open API docs: http://localhost:8000/docs

> Create at least one admin user by calling `/api/v1/auth/register` with `role="admin"`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the UI at the printed URL (usually http://localhost:5173).

### 4. Flow

- **Admin**
  - Login with admin credentials.
  - Import questions using `sample_questions.xlsx`.
  - Create and publish an exam.
- **Student**
  - Login as student.
  - See available exams, start one, answer questions.
  - Autosave is done every few seconds; you can refresh and resume.
  - Submit to see auto-graded score for objective questions.
