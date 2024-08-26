import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';
import './Add.css';

const Add = () => {
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [grade, setGrade] = useState('');
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

    const newClass = {
      className,
      subjectName,
      teacherName,
      grade,
      userEmail,
    };

    try {
      await axios.post('http://localhost:8080/classes/newclass', newClass);
      navigate('/teacher');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="add-container">
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="add-form">
          <Form.Group controlId="formClassName">
            <Form.Label className="header"><b>Class Name:</b></Form.Label>
            <Form.Control
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSubjectName">
            <Form.Label className="header"><b>Subject Name:</b></Form.Label>
            <Form.Control
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTeacherName">
            <Form.Label className="header"><b>Teacher Name:</b></Form.Label>
            <Form.Control
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
            />
          </Form.Group>

          {/* <Form.Group controlId="formGrade">
            <Form.Label className="header"><b>Code for others to join:</b></Form.Label>
            <Form.Control
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </Form.Group> */}

          <Form.Group controlId="formGradeSelect">
            <Form.Label className="header"><b>Select Grade:</b></Form.Label>
            <Form.Control
              as="select"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value=""><b>Select Grade</b></option>
              <option value="1">Below 10</option>
              <option value="2">10</option>
              <option value="3">11-12</option>
              <option value="4">UG</option>
              <option value="5">PG</option>
            </Form.Control>
          </Form.Group>
            <br></br>
          <Button variant="primary" type="submit">
            Add Class
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Add;
