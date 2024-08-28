//import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Room.css";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//import PropTypes from "prop-types";
function Room() {
   
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const { roomId } = useParams();
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
  const handleExitMeeting = () => {
    const targetUrl = `/student`;
    console.log("Navigating to:", targetUrl); // Log URL for debugging
    navigate(targetUrl);
    window.location.reload();
  };
  async function meetingUI(element) {
    
    const appId = parseInt(import.meta.env.VITE_APP_ID, 10);


const serverSecret = import.meta.env.VITE_SERVER_SECRET;
    console.log("App ID:", import.meta.env.VITE_APP_ID);
console.log("Server Secret:", import.meta.env.VITE_SERVER_SECRET);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      v4(),
      userEmail
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.origin +
            window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },

      onLeaveRoom: () => {
        handleExitMeeting();
      },
    });
  }
  return (
    <div className="room-container">
      <div
        id="meeting"
        className="meeting-container"
        ref={meetingUI}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
export default Room;
