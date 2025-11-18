/*
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

const AdminDashboard = () => {
  const [exams, setExams] = useState([])

  useEffect(() => {
    api.get('/exams').then(res => setExams(res.data)).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-x-4 mb-4">
        <Link className="bg-slate-800 text-black px-3 py-2 rounded" to="/admin/questions/import">
          Import Questions
        </Link>
        <Link className="bg-green-600 text-black px-3 py-2 rounded" to="/admin/exams/create">
          Create Exam
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-2">Exams</h2>
      <ul className="space-y-2">
        {exams.map(exam => (
          <li key={exam.id} className="bg-gray rounded shadow p-3">
            <div className="font-semibold">{exam.title}</div>
            <div className="text-sm text-gray-600">Questions: {exam.questions.length}</div>
            <div className="text-xs text-gray-500">Published: {exam.is_published ? 'Yes' : 'No'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashboard
*/


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then((res) => setExams(res.data)).catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      {/* Buttons */}
      <div className="mb-4">
        <Link to="/admin/questions/import" className="btn btn-dark me-2">
          <i className="bi bi-upload"></i> Import Questions
        </Link>

        <Link to="/admin/exams/create" className="btn btn-success">
          <i className="bi bi-plus-circle"></i> Create Exam
        </Link>
      </div>

      {/* Exam List */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">All Exams</h5>
        </div>

        <ul className="list-group list-group-flush">
          {exams.map((exam) => (
            <li key={exam.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{exam.title}</h6>
                <div className="text-muted small">
                  Questions: {exam.questions.length} | Published:{" "}
                  {exam.is_published ? (
                    <span className="badge bg-success">Yes</span>
                  ) : (
                    <span className="badge bg-secondary">No</span>
                  )}
                </div>
              </div>
            </li>
          ))}

          {exams.length === 0 && (
            <li className="list-group-item text-center text-muted">
              No exams found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
