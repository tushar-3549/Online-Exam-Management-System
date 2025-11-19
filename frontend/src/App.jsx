
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import QuestionImport from './pages/QuestionImport'
import ExamCreate from './pages/ExamCreate'
import StudentDashboard from './pages/StudentDashboard'
import ExamTake from './pages/ExamTake'
import ResultView from './pages/ResultView'

const App = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Online Exam
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/student">Student</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/questions/import" element={<QuestionImport />} />
          <Route path="/admin/exams/create" element={<ExamCreate />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/exams/:examId" element={<ExamTake />} />
          <Route path="/results/:submissionId" element={<ResultView />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

