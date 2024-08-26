import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import Schedule from './schedule/schedule';
import "./class.css";
import Announcement from "./Announcement/Announcement";
import Class from "./LiveClass/Class"
import Library from "./Library/Library";
const ClasS = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  //const [showSchedule, setShowSchedule] = useState(false);
  const [showLiveClass, setShowLiveClass] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/classes/getclass/${classId}`
        );
        setClassDetails(response.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);
  const handleSectionClickAnnounce = (section) => {
    if (section === "Announcements") {
      setShowAnnouncement(true);
    } else {
      setShowAnnouncement(false);
    }
  };
  const handleSectionClickLiveClass = (section) => {
    if (section === "Live Class") {
      setShowLiveClass(true);
    } else {
      setShowLiveClass(false);
    }
  };
  const handleSectionClickLibrary = (section) => {
    if (section === "Library") {
      setShowLibrary(true);
    } else {
      setShowLibrary(false);
    }
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
          <div className="section" style={{ cursor: "pointer" }}>
            <span
              className="announce-text"
              onClick={() => {
                handleSectionClickAnnounce("Announcements");
                handleSectionClickLiveClass("Announcements");
                handleSectionClickLibrary("Announcements");
              }}
            >
              ANNOUNCEMENTS
            </span>
            {showAnnouncement && <Announcement classId={classId} />}
          </div>
          <div className="section" style={{ cursor: "pointer" }}>
            <span
              className="liveclass-text"
              onClick={() => {
                handleSectionClickAnnounce("Live Class");
                handleSectionClickLiveClass("Live Class");
                handleSectionClickLibrary("Live Class");
              }}
            >
              Live Class
            </span>
            {showLiveClass && <Class classId={classId} />}
          </div>
         
          <div className="section" style={{ cursor: "pointer" }}>
            <span
              className="library-text"
              onClick={() => {
                handleSectionClickAnnounce("Library");
                handleSectionClickLiveClass("Library");
                handleSectionClickLibrary("Library");
              }}
            >
              Library
            </span>
            {showLibrary && <Library classId={classId} />}
          </div>
        </div>
        <hr style={{ color: "white" }}></hr>
      </div>
    </div>
  );
};

export default ClasS;
