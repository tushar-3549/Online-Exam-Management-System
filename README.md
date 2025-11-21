# Online Exam Management System 

**FastAPI (Backend) + React/Bootstrap (Frontend) + PostgreSQL (DB)**

This repository contains a full-stack Online Exam System including:

- Admin exam management
- Student exam participation
- Question import from Excel
- Automatic grading
- JWT authentication
- Autosave exam answers
- Bootstrap UI

## Project Structure

```
.
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── deps.py
│   │   │   └── v1
│   │   │       └── endpoints
│   │   │           ├── auth.py
│   │   │           ├── exams.py
│   │   │           ├── questions.py
│   │   │           └── submissions.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db
│   │   │   └── session.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── exam.py
│   │   │   ├── question.py
│   │   │   ├── submission.py
│   │   │   └── user.py
│   │   ├── schemas
│   │   │   ├── auth.py
│   │   │   ├── exam.py
│   │   │   ├── question.py
│   │   │   ├── submission.py
│   │   │   └── user.py
│   │   ├── services
│   │   │   ├── excel_import.py
│   │   │   └── grading.py
│   │   └── tests
│   │       ├── test_excel_import.py
│   │       └── test_grading.py
│   ├── README.md                   # backend documentation
│   └── requirements.txt
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md                  # frontend documentation
│   ├── src
│   │   ├── api
│   │   │   └── client.js
│   │   ├── App.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── AdminDashboard.jsx
│   │       ├── ExamCreate.jsx
│   │       ├── ExamTake.jsx
│   │       ├── Login.jsx
│   │       ├── QuestionImport.jsx
│   │       ├── ResultView.jsx
│   │       └── StudentDashboard.jsx
│   └── vite.config.js
├── photos
│   ├── api-swagger.png
│   ├── image-1.png
│   ├── image-2.png
│   ├── image-3.png
│   ├── image-4.png
│   ├── image-5.png
│   ├── image-6.png
│   └── image.png
├── README.md                   # root documentation
└── sample_questions.xlsx


```

## Tech Stack

**Backend**

- Python 3.10+
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- JWT Auth
- Uvicorn

**Frontend**

- React (Vite)
- Bootstrap 5
- React Router
- Axios
- Context API

### Features

***Admin***

- Import questions from Excel (.xlsx)
- Create exams with:

     - Title & description
     - Start/end time
     - Duration (minutes)
     - Publish control
     - Select questions
     - View all exams
     - View submissions

***Students***

- View upcoming/existing exams
- Attempt exam within valid time
- Autosave answers every 5 seconds
- Submit exam
- See score result

***System Core***

- JWT-based login system
- PostgreSQL database
- SQLAlchemy ORM
- Time validation for exams
- Automatic scoring for MCQ
- RESTful API with FastAPI
- Bootstrap UI


## Installation (Full Project)

1. Clone the repo
```
git clone https://github.com/tushar-3549/Online-Exam-Management-System
cd Online-Exam-Management-System
```

**Backend Setup**

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

***Create `.env` file:***
```
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET_KEY=secrect-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

***Start Server***: `uvicorn app.main:app --reload`

- API Docs -`http://127.0.0.1:8000/docs`


![alt text](<photos/api-swagger.png>)


**Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at ( http://localhost:5173).

***API Communication***

- Frontend uses:

```
frontend/src/api/client.js
baseURL: "http://127.0.0.1:8000/api/v1"
```

### Screenshots

***Login Page***
![alt text](photos/image.png)

***Admin Dashboard***
![alt text](photos/image-1.png)

***Admin - Import Ques***
![alt text](photos/image-2.png)

***Create Exam***
![alt text](photos/image-3.png)

***Student Dashboard***
![alt text](photos/image-4.png)

***Exam Attempt***
![alt text](photos/image-5.png)

***Result Page***
![alt text](photos/image-6.png)
