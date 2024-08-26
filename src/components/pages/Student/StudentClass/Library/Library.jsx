import { useState, useEffect } from "react";
import { db } from "../../../../../firebase/firebase";

import { collection, getDocs } from "firebase/firestore";
import "./Library.css";

function Library() {
  //const [file, setFile] = useState(null);
  //const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, "files"));
    const filesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesList);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="total-container">
      <div className="files-list">
        {files.map((file, index) => (
          <div key={index} className="file-card">
            <strong>{file.name}</strong>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className={files.length === 0 ? "hidden" : ""}
            >
              Download
            </a>
          </div>
        ))}
      </div>

      {files.length === 0 && <p style={{color:"#7df9ff",size:"medium"}}>No files available</p>}
    </div>
  );
}

export default Library;
