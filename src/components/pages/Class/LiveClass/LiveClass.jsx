import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./LiveClass.css";

function LiveClass() {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();

    async function handleJoin() {  
        if (roomId.trim()) {
            const user = auth.currentUser;
            const classDoc = doc(db, "liveClasses", roomId);
            await setDoc(classDoc, {
                roomId,
                teacherId: user.uid,
                isLive: true,
                timestamp: Date.now(),
            });
            navigate(`/room/${roomId}`);
        } else {
            alert("Please enter a valid Room ID");
        }
    }

    return (
        <div className="classcontainer">
            <h2 style={{color:"blue"}}>Live Class</h2>
            <input
                type="text"
                placeholder="Enter any Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <br/>
            <button className="button" onClick={handleJoin}>Join</button>
        </div>
    );
}

export default LiveClass;
