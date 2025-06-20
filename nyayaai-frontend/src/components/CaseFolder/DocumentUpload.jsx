import React, { useState } from "react";

const DocumentUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload({ name: selectedFile.name, content: "Mocked content for RAG" });
      setSelectedFile(null);
    }
  };

  return (
    <div className="doc-upload">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
