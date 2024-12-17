import React, { useState } from "react";

function Help() {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };

  return (
    <div className="relative mt-4">
      {/* Button Help Icon */}
      <button
        onClick={toggleHelp}
        className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 focus:outline-none"
        title="Help"
      >
        ?
      </button>

      {/* Konten Help */}
      {showHelp && (
        <div
          className="absolute top-12 right-0 bg-gray-200 p-4 rounded shadow-lg max-w-screen-sm max-h-64 z-10 overflow-auto"
          style={{ whiteSpace: "normal" }} 
        >
          <h2 className="text-lg font-bold mb-2">How to Use the Application</h2>
          <ol className="list-decimal list-inside text-gray-700">
            <li>
              <strong>Choose File:</strong> Click the <i>choose file</i> button
              and select a JSON file from your computer.
            </li>
            <li>
              <strong>Parse:</strong> Click the <i>Parse</i> button to validate
              and check if the JSON file is correct.
            </li>
            <li>
              <strong>Translate:</strong> Click the <i>Translate</i> button to
              convert the JSON content into a PHP array format.
            </li>
          </ol>
          <p className="mt-2 text-gray-600">
            Make sure the uploaded file is a valid JSON file format.
          </p>
        </div>
      )}
    </div>
  );
}
    
export default Help;
