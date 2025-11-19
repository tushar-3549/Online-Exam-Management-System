import React, { useEffect, useState } from "react";
import api from "../api/client";

const ExamCreate = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [selected, setSelected] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get("/questions").then((res) => setQuestions(res.data)).catch(console.error);
  }, []);

  const toggleQuestion = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/exams", {
        title,
        description,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        duration_minutes: Number(duration),
        is_published: isPublished,
        question_ids: selected,
      });

      setMessage("Exam created successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create exam.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4 text-center">Create New Exam</h2>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Exam Title</label>
          <input
            className="form-control"
            placeholder="Enter exam title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter exam description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Start Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">End Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label fw-semibold">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="publishCheck"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publishCheck" className="form-check-label">
            Publish this exam
          </label>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold mb-2">Select Questions</h5>

          <div
            className="border p-3 bg-light"
            style={{ maxHeight: "280px", overflowY: "auto" }}
          >
            {questions.length === 0 && (
              <p className="text-muted text-center">No questions available.</p>
            )}

            {questions.map((q) => (
              <div className="form-check mb-2" key={q.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={q.id}
                  checked={selected.includes(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                />
                <label className="form-check-label" htmlFor={q.id}>
                  {q.title} <span className="badge bg-secondary">{q.type}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-success mt-4 w-100 py-2 fw-bold">
          Save Exam
        </button>
      </form>
    </div>
  );
};

export default ExamCreate;
