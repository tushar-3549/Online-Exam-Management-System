/*
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'

const ResultView = () => {
  const { submissionId } = useParams()
  const [submission, setSubmission] = useState(null)

  useEffect(() => {
    api.get(`/submissions/${submissionId}`).then(res => setSubmission(res.data)).catch(console.error)
  }, [submissionId])

  if (!submission) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Exam Result</h2>
      <p>Total Score: <span className="font-semibold">{submission.total_score ?? 'Pending'}</span></p>
      <p>Status: {submission.status}</p>
    </div>
  )
}

export default ResultView
*/


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

const ResultView = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    api
      .get(`/submissions/${submissionId}`)
      .then((res) => setSubmission(res.data))
      .catch(console.error);
  }, [submissionId]);

  if (!submission)
    return (
      <div className="text-center mt-5 fs-4 text-muted">Loading...</div>
    );

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="fw-bold text-center mb-3">Exam Result</h2>

        <div className="mb-3">
          <strong>Total Score: </strong>
          <span className="fs-5">
            {submission.total_score !== null ? submission.total_score : "Pending"}
          </span>
        </div>

        <div className="mb-3">
          <strong>Status: </strong>
          {submission.status === "submitted" ? (
            <span className="badge bg-success">Submitted</span>
          ) : (
            <span className="badge bg-warning text-dark">In Progress</span>
          )}
        </div>

        <div className="text-muted small text-center mt-3">
          Thank you for completing the exam.
        </div>
      </div>
    </div>
  );
};

export default ResultView;

