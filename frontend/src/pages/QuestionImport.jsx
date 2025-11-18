/*
import React, { useState } from 'react'
import api from '../api/client'

const QuestionImport = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await api.post('/questions/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(res.data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Import failed')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Import Questions from Excel</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-blue-600 text-black px-4 py-2 rounded" type="submit">
          Upload
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {result && (
        <div className="mt-4">
          <div>Inserted: {result.inserted}</div>
          {result.errors?.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Errors:</h3>
              <ul className="list-disc pl-5 text-sm text-red-600">
                {result.errors.map((e, idx) => (
                  <li key={idx}>Row {e.row}: {e.error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionImport
*/


import React, { useState } from "react";
import api from "../api/client";

const QuestionImport = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/questions/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Import failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="fw-bold mb-4 text-center">Import Questions</h2>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Upload Excel (.xlsx)</label>
            <input
              type="file"
              className="form-control"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Upload
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Success Message + Result */}
        {result && (
          <div className="mt-4">
            <div className="alert alert-success" role="alert">
              File imported successfully!
            </div>

            <h5 className="fw-semibold mb-2">Summary:</h5>
            <p><strong>Inserted:</strong> {result.inserted}</p>

            {/* Error Table */}
            {result.errors?.length > 0 && (
              <div className="mt-3">
                <h6 className="fw-bold">Errors Found:</h6>
                <table className="table table-bordered table-sm mt-2">
                  <thead className="table-light">
                    <tr>
                      <th>Row</th>
                      <th>Error Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.errors.map((e, idx) => (
                      <tr key={idx}>
                        <td>{e.row}</td>
                        <td>{e.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionImport;
