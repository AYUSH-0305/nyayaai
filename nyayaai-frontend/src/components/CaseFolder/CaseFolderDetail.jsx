import React, { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import RAGInteraction from "./RAGInteraction";

const CaseFolderDetail = ({ folder }) => {
  const [documents, setDocuments] = useState([]);

  const handleUpload = (doc) => {
    setDocuments([...documents, doc]);
  };

  if (!folder) return <div className="folder-detail">Select a folder to begin</div>;

  return (
    <div className="folder-detail">
      <h2>📂 {folder}</h2>
      <DocumentUpload onUpload={handleUpload} />
      <div className="uploaded-docs">
        {documents.map((doc, index) => (
          <div key={index} className="doc-card">
            <h4>{doc.name}</h4>
            <RAGInteraction file={doc} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseFolderDetail;
