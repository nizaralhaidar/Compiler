import React, { useState } from "react";

function Info() {
  const [showInfo, setShowInfo] = useState(false); 

  const toggleInfo = () => {
    setShowInfo((prev) => !prev); 
  };

  return (
    <div className="relative mt-4">
      {/* Button Info Icon */}
      <button
        onClick={toggleInfo}
        className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 focus:outline-none"
        title="Info"
      >
        i
      </button>

      {/* Konten Info */}
      {showInfo && (
        <div className="absolute top-10 left-0 bg-gray-200 p-4 rounded shadow-lg w-72 z-10">
          <p className="text-gray-700">
            This software is used to translate <strong>xtUML</strong> into code
            in <strong>PHP</strong> language.
          </p>
        </div>
      )}
    </div>
  );
}

export default Info;
