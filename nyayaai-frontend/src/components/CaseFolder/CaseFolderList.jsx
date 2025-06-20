import React, { useState } from "react";

const CaseFolderList = ({ onSelectFolder }) => {
  const [folders, setFolders] = useState(["Demo Case"]);
  const [newFolderName, setNewFolderName] = useState("");

  const addFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName]);
      setNewFolderName("");
    }
  };

  return (
    <div className="folder-list">
      <h3>📁 Case Folders</h3>
      <ul>
        {folders.map((folder, index) => (
          <li key={index} onClick={() => onSelectFolder(folder)}>
            {folder}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New folder"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
      <button onClick={addFolder}>Add</button>
    </div>
  );
};

export default CaseFolderList;
