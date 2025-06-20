import React from "react";

const StructuredResponse = ({ data }) => {
  return (
    <div className="structured-response">
      {data.map((section, idx) => (
        <div key={idx}>
          <h3>{section.title}</h3>
          <ul>
            {section.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StructuredResponse;
