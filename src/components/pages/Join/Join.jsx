import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';
import './Join.css';

const Join = () => {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [classId, setClassId] = useState('');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const joinClassData = {
      className,
      teacherName,
      classId,
      studentEmail: userEmail,
    };

    try {
      await axios.post('http://localhost:8080/classes/joinclass', joinClassData);
      navigate('/student');
    } catch (error) {
      console.error('Error joining class:', error);
      setError(error.response.data.error);
      
    }
  };

  return (
    <div className="join-container">
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="join-form">
          <Form.Group controlId="formClassName">
            <Form.Label className="header"><b>Class Name:</b></Form.Label>
            <Form.Control
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTeacherName">
            <Form.Label className="header"><b>Teacher Name:</b></Form.Label>
            <Form.Control
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formClassId">
            <Form.Label className="header"><b>Class ID (Optional):</b></Form.Label>
            <Form.Control
              type="text"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
          </Form.Group>

          <br></br>
          <Button variant="primary" type="submit">
            Join Class
          </Button>
          {error && <p className="error-message">{error}</p>}
          
        </Form>
      </div>
    </div>
  );
};

export default Join;
