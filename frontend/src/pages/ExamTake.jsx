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

  // Error
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

                {/* IMAGE UPLOAD */}
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
