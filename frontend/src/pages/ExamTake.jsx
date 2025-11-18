/*
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'

const ExamTake = () => {
  const { examId } = useParams()
  const [exam, setExam] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [answers, setAnswers] = useState({})
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  // useEffect(() => {
  //   api.get(`/exams/${examId}`).then(res => setExam(res.data)).catch(console.error)
  //   api.post('/submissions/start', { exam_id: examId })
  //     .then(res => {
  //       setSubmission(res.data)
  //       setAnswers(res.data.answers || {})
  //     })
  //     .catch(console.error)
  // }, [examId])


  useEffect(() => {
  const loadExam = async () => {
    try {
      const [examRes, subRes] = await Promise.all([
        api.get(`/exams/${examId}`),
        api.post('/submissions/start', { exam_id: examId })
      ])

      setExam(examRes.data)
      setSubmission(subRes.data)
      setAnswers(subRes.data.answers || {})
    } catch (err) {
      console.error(err)
      setMessage(
        err.response?.data?.detail || 
        'Exam not available. It may not be published or time has expired.'
      )
    }
  }
  loadExam()
}, [examId])

//   useEffect(() => {
//   api.post('/submissions/start', { exam_id: examId })
//     .then(res => {
//       setSubmission(res.data)
//       setAnswers(res.data.answers || {})
//     })
//     .catch(err => {
//       console.error(err)
//       setMessage("Failed to start exam: " + err.response?.data?.detail || err.message)
//     })
// }, [examId])


  // autosave
  useEffect(() => {
    if (!submission) return
    const interval = setInterval(() => {
      api.patch(`/submissions/${submission.id}`, { answers })
        .then(res => setSubmission(res.data))
        .catch(err => console.error('autosave failed', err))
    }, 5000) // every 5 seconds
    return () => clearInterval(interval)
  }, [submission, answers])

  const handleChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  const handleMultiChange = (qid, option) => {
    setAnswers(prev => {
      const current = Array.isArray(prev[qid]) ? prev[qid] : []
      if (current.includes(option)) {
        return { ...prev, [qid]: current.filter(o => o !== option) }
      }
      return { ...prev, [qid]: [...current, option] }
    })
  }

  const handleSubmit = async () => {
    try {
      const resSave = await api.patch(`/submissions/${submission.id}`, { answers })
      const res = await api.post(`/submissions/${submission.id}/submit`)
      navigate(`/results/${res.data.id}`)
    } catch (err) {
      console.error(err)
      setMessage('Submit failed')
    }
  }

  // if (!exam || !submission) return <div>Loading...</div>
  if (message) {
  return (
    <div className="text-red-500 text-center mt-10 text-lg">
      {message}
    </div>
  )
}

if (!exam || !submission) return <div>Loading...</div>


  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{exam.title}</h2>
      <p className="mb-4 text-sm text-gray-600">{exam.description}</p>
      <div className="space-y-4">
        {exam.questions.map((q, index) => (
          <div key={q.id} className="bg-white rounded shadow p-3">
            <div className="font-semibold mb-1">{index + 1}. {q.title}</div>
            {q.type === 'single_choice' && (
              <div className="space-y-1">
                {q.options?.map(opt => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={q.id}
                      className="mr-2"
                      checked={answers[q.id] === opt}
                      onChange={() => handleChange(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {q.type === 'multi_choice' && (
              <div className="space-y-1">
                {q.options?.map(opt => (
                  <label key={opt} className="block">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                      onChange={() => handleMultiChange(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {q.type === 'text' && (
              <textarea
                className="border p-2 w-full"
                value={answers[q.id] || ''}
                onChange={e => handleChange(q.id, e.target.value)}
              />
            )}
            {q.type === 'image_upload' && (
              <div className="text-sm text-gray-500">
                Image upload is not fully implemented in this simple demo. You can store a URL or text note here.
                <input
                  className="border p-2 w-full mt-2"
                  value={answers[q.id] || ''}
                  onChange={e => handleChange(q.id, e.target.value)}
                  placeholder="Image URL or note"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit Exam
      </button>
      {message && <div className="mt-2 text-red-500">{message}</div>}
      <div className="mt-2 text-xs text-gray-500">Autosave enabled (every 5 seconds).</div>
    </div>
  )
}

export default ExamTake
*/



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

const ExamTake = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Load exam + auto-start submission
  useEffect(() => {
    const loadExam = async () => {
      try {
        const [examRes, subRes] = await Promise.all([
          api.get(`/exams/${examId}`),
          api.post("/submissions/start", { exam_id: examId }),
        ]);

        setExam(examRes.data);
        setSubmission(subRes.data);
        setAnswers(subRes.data.answers || {});
      } catch (err) {
        console.error(err);
        setMessage(
          err.response?.data?.detail ||
            "Exam not available. It may not be published or time has expired."
        );
      }
    };
    loadExam();
  }, [examId]);

  // Autosave every 5 seconds
  useEffect(() => {
    if (!submission) return;

    const interval = setInterval(() => {
      api
        .patch(`/submissions/${submission.id}`, { answers })
        .then((res) => setSubmission(res.data))
        .catch((err) => console.error("autosave failed", err));
    }, 5000);

    return () => clearInterval(interval);
  }, [submission, answers]);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleMultiChange = (qid, option) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[qid]) ? prev[qid] : [];
      if (current.includes(option)) {
        return { ...prev, [qid]: current.filter((o) => o !== option) };
      }
      return { ...prev, [qid]: [...current, option] };
    });
  };

  const handleSubmit = async () => {
    try {
      await api.patch(`/submissions/${submission.id}`, { answers });
      const res = await api.post(`/submissions/${submission.id}/submit`);
      navigate(`/results/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setMessage("Submit failed");
    }
  };

  // Error UI
  if (message) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center fs-5">{message}</div>
      </div>
    );
  }

  if (!exam || !submission) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow p-4">
        <h2 className="fw-bold">{exam.title}</h2>
        <p className="text-muted">{exam.description}</p>

        <hr />

        <div className="mt-3">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {index + 1}. {q.title}
                </h5>

                {/* SINGLE CHOICE */}
                {q.type === "single_choice" && (
                  <div>
                    {q.options?.map((opt) => (
                      <div className="form-check" key={opt}>
                        <input
                          type="radio"
                          name={q.id}
                          className="form-check-input"
                          checked={answers[q.id] === opt}
                          onChange={() => handleChange(q.id, opt)}
                        />
                        <label className="form-check-label">{opt}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* MULTI CHOICE */}
                {q.type === "multi_choice" && (
                  <div>
                    {q.options?.map((opt) => (
                      <div className="form-check" key={opt}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            Array.isArray(answers[q.id]) &&
                            answers[q.id].includes(opt)
                          }
                          onChange={() => handleMultiChange(q.id, opt)}
                        />
                        <label className="form-check-label">{opt}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* TEXT */}
                {q.type === "text" && (
                  <textarea
                    className="form-control"
                    rows="3"
                    value={answers[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  ></textarea>
                )}

                {/* IMAGE UPLOAD Fallback */}
                {q.type === "image_upload" && (
                  <div>
                    <small className="text-muted">
                      Image upload not fully implemented — store an image URL or
                      note.
                    </small>
                    <input
                      className="form-control mt-2"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      placeholder="Image URL or note"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-success btn-lg mt-3 w-100 fw-bold"
          onClick={handleSubmit}
        >
          Submit Exam
        </button>

        <div className="text-muted text-center mt-2">
          Autosave enabled (every 5 seconds)
        </div>
      </div>
    </div>
  );
};

export default ExamTake;
