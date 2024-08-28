import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Announcement.css';

const Announcement = ({ classId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${baseURL}/announcement/${classId}`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [classId,baseURL]);

  const handleAddAnnouncement = async () => {
    try {
      const response = await axios.post(`${baseURL}/announcement/add`, {
        text: newAnnouncement,
        classId,
      });

      setAnnouncements([response.data.announcement, ...announcements]);
      setNewAnnouncement('');
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`${baseURL}/announcement/${id}`);
      setAnnouncements(announcements.filter(announcement => announcement._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="announcement-container">
      <div className="announcement-form">
        <textarea
          placeholder="Write an announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button onClick={handleAddAnnouncement}>Announce</button>
      </div>
      <div className="announcement-list">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-item">
            <div>
              {announcement.text}
              <span className="announcement-date">{new Date(announcement.createdAt).toLocaleString()}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteAnnouncement(announcement._id)}
            >
              Delete
            </button>
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
