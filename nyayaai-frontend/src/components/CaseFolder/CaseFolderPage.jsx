
import React, { useState } from "react";
import CaseFolderList from "./CaseFolderList";
import CaseFolderDetail from "./CaseFolderDetail";
import "./CaseFolder.css";

const CaseFolderPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className="case-folder-container">
      <CaseFolderList onSelectFolder={setSelectedFolder} />
      <CaseFolderDetail folder={selectedFolder} />
    </div>
  );
};

export default CaseFolderPage;
