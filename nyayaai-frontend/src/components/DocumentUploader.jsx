import React, { useState } from "react";
import "../styles/uploader.css";

const DocumentUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("document", file);
    await onUpload(formData);
  };

  return (
    <div className="uploader">
      <input type="file" accept=".pdf,.jpg,.png" onChange={handleChange} />
      <button onClick={handleUpload}>Upload & Summarize</button>
    </div>
  );
};

export default DocumentUploader;
