# Frontend - Online Exam Management System

This is the (React.js + bootstrap) frontend for the Online Exam System.
It provides UI for Admin and Student operations such as: Login, Import Questions, Exam Creation, Exam Listing, Taking Exams with, Autosave, Result Display etc.

## Features

- Login (JWT token stored in localStorage)
- Excel question import interface
- Admin UI for creating exams
- Student exam dashboard
- Clean exam-taking UI with autosave every 5 seconds
- Automatic submission & redirect to results
- Responsive UI with Bootstrap 5

## Setup

```bash
1. Navigate to frontend folder: cd frontend
2. Install dependencies: npm install
3. Start development server: npm run dev
```

The frontend is running on `http://localhost:5173`.

### Backend Connection

The Axios API client uses: `/src/api/client.js`


## Frontend Overview 

**Login Page**

- Users login with email/password
- If login includes "admin" -> route to Admin dashboard
- Otherwise route to Student dashboard

**Admin Dashboard**

- Import Questions
- Create Exams
- Show list of exams

**Question Import**

- Upload Excel file (.xlsx)
- Backend validates rows
- Shows inserted rows & errors

**Exam Creation**

- Title, description
- Start/end time selector
- Duration
- Publish
- Select questions list
- Sends data as ISO timestamps

**Student Dashboard**

- Shows list of published exams
- Only current (start_time < now < end_time) exams can start

**Supports**

- Single choice
- Multiple choice
- Text
- Image text placeholder

**Submit Exam**

- Sends saved answers
- Sends final submit call
- Redirects to results page

**Result View**

Shows:

    - Score
    - Status
