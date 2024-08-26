import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Announcement.css';

const Announcement = ({ classId }) => {
  const [announcements, setAnnouncements] = useState([]);
 // const [newAnnouncement, setNewAnnouncement] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/announcement/${classId}`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [classId]);

 


  return (
    <div className="announcement-container">
      <h5 style={{color:"#7DF9FF"}}>ANNOUNCEMENTS</h5>
      <div className="announcement-list">
      
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-item">
            <div>
              {announcement.text}
              <span className="announcement-date">{new Date(announcement.createdAt).toLocaleString()}</span>
            </div>
            
             
          </div>
        ))}
      </div>
    </div>
  );
};

Announcement.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default Announcement;
