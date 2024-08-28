import { useParams } from "react-router-dom";
import "./Room.css";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Room() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const db = getFirestore();

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

  const handleExitMeeting = async () => {
    const targetUrl = `/teacher`;
    await updateDoc(doc(db, "liveClasses", roomId), { isLive: false });
    navigate(targetUrl);
    window.location.reload();
  };

  async function meetingUI(element) {
    const appId = parseInt(import.meta.env.VITE_APP_ID, 10);
    const serverSecret = import.meta.env.VITE_SERVER_SECRET;

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
          name: 'Paste this link in the Announcement section',
          url: window.location.origin + window.location.pathname + '?roomID=' + roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      onLeaveRoom: handleExitMeeting,
    });
  }

  return (
    <div className="room-container">
      <div
        id="meeting"
        className="meeting-container"
        ref={meetingUI}
        
      ></div>
    </div>
  );
}

export default Room;
