import { useState, useEffect } from "react";
import { storage, db } from "../../../../firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./Library.css";

function Library() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (file && fileName) {
      const fileRef = ref(storage, `files/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      await addDoc(collection(db, "files"), {
        name: fileName,
        url: url,
        fileName: file.name,
      });

      setFile(null);
      setFileName("");
      fetchFiles(); // Refresh the list after uploading
    }
  };

  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, "files"));
    const filesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesList);
  };

  const handleDelete = async (file) => {
    const fileRef = ref(storage, `files/${file.fileName}`);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, "files", file.id));
    fetchFiles(); // Refresh the list after deletion
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="total-container">
      <div className="library-container">
        <div className="upload-container">
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            placeholder="Enter file name"
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload File</button>
        </div>
      </div>
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
            <button
              onClick={() => handleDelete(file)}
              className={files.length === 0 ? "hidden" : ""}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {files.length === 0 && <p>No files available</p>}
    </div>
  );
}

export default Library;
