import React, { useState } from "react";
import "./../styles/Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/file/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload and summarize file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Legal Document</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.txt"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Summarizing..." : "Upload & Summarize"}
      </button>

      {summary && (
        <div className="summary-box">
          <h3>📝 Summary</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
};

export default Upload;
