import React, { useState } from "react";

function Input({ setJsonData }) {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result); 
            setJsonData(JSON.stringify(json, null, 2)); 
          } catch (err) {
            alert("Invalid JSON file.");
          }
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a valid JSON file.");
      }
    } else {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="file-input flex flex-col items-center mt-4 w-full">
      <div className="file-container flex items-center space-x-2 bg-gray-800 p-2 rounded w-64">
        <button
          id="chooseFileButton"
          className="px-4 py-2 bg-white text-gray-800 rounded border border-white hover:bg-gray-800"
          onClick={() => document.getElementById("fileInput").click()}
        >
          choose file
        </button>
        <span id="fileName" className="text-white">{fileName}</span>
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".json" 
        onChange={handleFileChange}
      />
    </div>
  );
}

export default Input;
