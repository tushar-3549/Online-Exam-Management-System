# Backend - Online Exam Management System

## Setup

1. Create a PostgreSQL database, for example:

   ```sql
   CREATE DATABASE online_exam;
   CREATE USER exam_user WITH PASSWORD 'exam_password';
   GRANT ALL PRIVILEGES ON DATABASE online_exam TO exam_user;
   ```

2. Copy `.env.example` to `.env` and adjust values.

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
