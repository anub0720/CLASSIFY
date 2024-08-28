// src/Enrolled/Enrolled.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import "./Enrolled.css";
import PropTypes from 'prop-types';
const Enrolled = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseURL}/classes/getclass/${classId}`);
        setStudents(response.data.studentEmails);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    fetchStudents();
  }, [classId, baseURL]);

  const handleRemoveStudent = async (studentEmail) => {
    try {
      await axios.post(`${baseURL}/classes/removeStudent`, {
        classId,
        studentEmail,
      });
      setStudents(students.filter(email => email !== studentEmail));
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <div className="enrolled-container">
      <h2>Enrolled Students</h2>
      <ul>
        {students.map((email) => (
          <li key={email} className="student-item">
            <span>{email}</span>
            
            <button onClick={() => handleRemoveStudent(email)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enrolled;
Enrolled.propTypes = {
    classId: PropTypes.string,
    };