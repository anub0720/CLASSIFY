import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import './Teacher.css';
import { getAuth } from 'firebase/auth'; 
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import image3 from '../../../assets/image3.png';
import image4 from '../../../assets/image4.png';

const Teacher = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';

  useEffect(() => {
    const fetchClasses = async () => {
      if (user) {
        try {
          const response = await axios.get(`${baseURL}/classes/getclasses`, {
            params: { email: user.email },
          });
          setClasses(response.data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      }
    };

    fetchClasses();
  }, [user, baseURL]);  // Added baseURL to the dependency array

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
  };
 
  const images = [image1, image2, image3, image4];

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
     
      <div className="teacher-container">
      
     

        {classes.map((classItem) => (
          <Card key={classItem._id} className="class-card" onClick={() => handleClassClick(classItem._id)}>
            <Card.Img variant="top" src={getRandomImage()} alt="Class image" />
            <Card.Body>
              <Card.Title className='card-header'><b>{classItem.className}</b></Card.Title>
              <Card.Text className='card-text'><b>Subject</b>: {classItem.subjectName}</Card.Text>
              <Card.Text className='card-text'><b>Teacher</b>: {classItem.teacherName}</Card.Text>
              <Card.Text className='card-text'><b>Teacher email</b>:{classItem.userEmail}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
