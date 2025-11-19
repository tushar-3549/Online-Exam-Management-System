# Backend - Online Exam Management System

This is the backend API for the Online Exam System, built using FastAPI, SQLAlchemy, and PostgreSQL.
It provides APIs for authentication, exam creation, question import, submissions, and automated grading.

## Features

- User Authentication (JWT)
- Admin: Upload Questions (Excel)
- Admin: Create & Publish Exams
- Student: View & Attempt Exams
- Autosave exam submissions every few seconds
- Automatic grading for MCQ
- API returns JSON responses
- Time-based exam validation (start/end)

## Setup

1. Create a PostgreSQL database.

2. Copy or create `.env` and adjust values.

3. Create virtualenv and install dependencies:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Run the server:

   ```bash
   uvicorn app.main:app --reload
   ```

5. Open docs at `http://localhost:8000/docs`.

## Tests

Run:

```bash
pytest
```


