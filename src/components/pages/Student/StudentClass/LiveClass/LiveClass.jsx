import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import "./LiveClass.css";

function LiveClass() {
    const [roomId, setRoomId] = useState("");
    const [classStarted, setClassStarted] = useState(false); // Track if the class is live
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        if (roomId) {
            // Listen for changes to the class document
            const unsubscribe = onSnapshot(doc(db, "liveClasses", roomId), (doc) => {
                if (doc.exists()) {
                    const classData = doc.data();
                    if (classData.isLive) {
                        setClassStarted(true);
                        alert(`Class has started in Room ID: ${roomId}`); // Alert when class starts
                    } else {
                        setClassStarted(false);
                    }
                } else {
                    setClassStarted(false);
                }
            });

            return () => unsubscribe(); // Cleanup subscription on component unmount
        }
    }, [db, roomId]); // Include `db` as a dependency

    function handleJoin() {
        if (roomId.trim()) {
            if (classStarted) {
                navigate(`/room/${roomId}`);
            } else {
                alert("The class has not started yet. Please wait for your teacher to start the class.");
            }
        } else {
            alert("Please enter a valid Room ID");
        }
    }

    return (
        <div className="classcontainer">
            <h2 style={{color:"blue"}}>Live Class</h2>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <br/>
            <button className="button" onClick={handleJoin}>Join</button>
        </div>
    );
}

export default LiveClass;
