import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';
import '../pagescss/assignmnet.css';

const Assignment = () => {
  const { user } = useContext(AuthContext);

  const [subject, setSubject] = useState('');
  const [pdfFile, setPdfFile] = useState(null); // store PDF file
  const [submissionDate, setSubmissionDate] = useState('');
  const [targetStudents, setTargetStudents] = useState(user?.mentess);
  const [allStudents, setAllStudents] = useState([]);
  const [message, setMessage] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setMessage('❌ Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('questions', pdfFile); // must match field expected by backend
    formData.append('submissiondate', submissionDate);
    formData.append('mentorid', user._id);
    targetStudents.forEach((id) => formData.append('targets[]', id));

    try {
      await axios.post('http://localhost:8002', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('✅ Assignment created successfully!');
      setSubject('');
      setPdfFile(null);
      setSubmissionDate('');
      setTargetStudents([]);
    } catch (error) {
      console.error('Error creating assignment:', error);
      setMessage('❌ Failed to create assignment.');
    }
  };

  return (
    <div className="assignment-container">
      <h2>Create New Assignment</h2>

      <form onSubmit={handleSubmit} className="assignment-form">
        <div className="form-group">
          <label>Subject Name</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Questions (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label>Submission Date</label>
          <input
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            required
          />
        </div>

  
        <button type="submit" className="submit-btn">
          Create Assignment
        </button>
        <button type="button" className="submit-btn">
          View All Assignments
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Assignment;
