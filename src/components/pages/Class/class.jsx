// src/Class.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./class.css";
import Announcement from "./Announcement/Announcement";
import Class from "./LiveClass/Class";
import Library from "./Library/Library";
import Enrolled from "./Enrolled/Enrolled"; // Import the Enrolled component

const ClasS = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showLiveClass, setShowLiveClass] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showEnrolled, setShowEnrolled] = useState(false); // State for Enrolled section
  const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/classes/getclass/${classId}`);
        setClassDetails(response.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId, baseURL]);

  const handleSectionClick = (section) => {
    setShowAnnouncement(section === "Announcements");
    setShowLiveClass(section === "Live Class");
    setShowLibrary(section === "Library");
    setShowEnrolled(section === "Enrolled"); // Toggle Enrolled section
  };

  return (
    <div className="class-container">
      <div className="content">
        <h1>
          <b>{classDetails ? classDetails.className : "Loading..."}</b>
          <br/>
          <b style={{fontSize:"0.8rem"}}>{classDetails?classDetails.teacherName:""}</b>
        </h1>
        <br />
        <br />

        <div className="sections" style={{marginTop:"3rem"}}>
          <div className="section" style={{ cursor: "pointer" }} onClick={() => handleSectionClick("Announcements")}>
            <span
              className="announce-text"
              
            >
              Announcements
            </span>
            {showAnnouncement && <Announcement classId={classId} />}
          </div>
          <div className="section" style={{ cursor: "pointer" }}  onClick={() => handleSectionClick("Live Class")}>
            <span
              className="liveclass-text"
             
            >
              Live Class
            </span>
            {showLiveClass && <Class classId={classId} />}
          </div>
          <div className="section" style={{ cursor: "pointer" }}  onClick={() => handleSectionClick("Library")}>
            <span
              className="library-text"
             
            >
              Library
            </span>
            {showLibrary && <Library classId={classId} />}
          </div>
          <div className="section" style={{ cursor: "pointer" }}  onClick={() => handleSectionClick("Enrolled")}>
            <span
              className="enrolled-text"
             
            >
              Enrolled Students
            </span>
            {showEnrolled && <Enrolled classId={classId} />}
          </div>
        </div>
        <hr style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default ClasS;
