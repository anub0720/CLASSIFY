import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Card from 'react-bootstrap/Card';
import './Student.css';

// Import your images
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import image3 from '../../../assets/image3.png';
import image4 from '../../../assets/image4.png';

const Student = () => {
  const [classes, setClasses] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchClasses(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  const fetchClasses = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/classes/studentclasses/${email}`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/studentclass/${classId}`);
  };

  // List of available images
  const images = [image1, image2, image3, image4];

  // Function to select a random image from the list
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <div className="student-container">
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

export default Student;
