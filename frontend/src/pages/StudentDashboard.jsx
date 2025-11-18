/*
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

const StudentDashboard = () => {
  const [exams, setExams] = useState([])

  useEffect(() => {
    api.get('/exams').then(res => setExams(res.data)).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Exams</h1>
      <ul className="space-y-2">
        {exams.map(exam => (
          <li key={exam.id} className="bg-white rounded shadow p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{exam.title}</div>
              <div className="text-xs text-gray-500">Duration: {exam.duration_minutes} minutes</div>
            </div>
            <Link className="bg-blue-600 text-black px-3 py-1 rounded" to={`/student/exams/${exam.id}`}>
              Start / Resume
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentDashboard
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api
      .get("/exams")
      .then((res) => setExams(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4 text-center">Available Exams</h2>

      <div className="row">
        {exams.map((exam) => (
          <div className="col-md-4 mb-4" key={exam.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">{exam.title}</h5>
                <p className="card-text text-muted small mb-2">
                  Duration: {exam.duration_minutes} minutes
                </p>

                <Link 
                  to={`/student/exams/${exam.id}`} 
                  className="btn btn-primary w-100"
                >
                  Start / Resume
                </Link>
              </div>
            </div>
          </div>
        ))}

        {exams.length === 0 && (
          <div className="col-12 text-center text-muted mt-4">
            No exams available.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
