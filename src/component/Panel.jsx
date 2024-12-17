import React, { useState } from "react";

function Panel({ jsonData }) {
  const [parsedData, setParsedData] = useState(""); // Hasil translasi ke PHP
  const [validationMessage, setValidationMessage] = useState(""); // Pesan validasi
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error

  // Validasi JSON
  const handleParse = () => {
    try {
      JSON.parse(jsonData);
      setValidationMessage("JSON is valid!");
      setErrorMessage("");
    } catch (error) {
      setValidationMessage("");
      setErrorMessage("Invalid JSON: " + error.message);
    }
  };

  // Fungsi untuk mentranslasi JSON menjadi kode PHP
  const handleTranslate = () => {
    try {
      const data = JSON.parse(jsonData);
      const phpResult = convertJsonToFullPhpCode(data);
      setParsedData(`<?php\n\n${phpResult}`);
    } catch (error) {
      setErrorMessage("Error translating JSON to PHP: " + error.message);
      setParsedData("");
    }
  };

  // Fungsi utama untuk konversi JSON ke kode PHP lengkap
  const convertJsonToFullPhpCode = (data) => {
    if (!data.model || !Array.isArray(data.model)) {
      throw new Error("Invalid JSON structure: 'model' not found or not an array.");
    }

    // Gunakan Set untuk menghindari duplikasi kelas
    const classesSet = new Set();

    data.model.forEach((item) => {
      if (item.type === "class" && item.attributes && item.class_name) {
        const attributes = convertAttributesToObject(item.attributes);
        const states = item.states || [];
        const phpClass = convertToPhpClassWithStates(attributes, states, capitalize(item.class_name));
        classesSet.add(phpClass);
      }
    });

    if (classesSet.size === 0) {
      throw new Error("No valid classes found in JSON.");
    }

    return Array.from(classesSet).join("\n\n");
  };

  const convertAttributesToObject = (attributes) => {
    const result = {};
    attributes.forEach((attr) => {
      if (attr.attribute_name) {
        result[attr.attribute_name] = attr.data_type || "string";
      }
    });
    return result;
  };

  const convertToPhpClassWithStates = (attributes, states, className) => {
    const attributeDeclarations = Object.keys(attributes).map(
      (key) => `    private $${key};`
    );

    const constructorParams = Object.keys(attributes)
      .map((key) => `$${key}`)
      .join(", ");
    const constructorBody = Object.keys(attributes)
      .map((key) => `        $this->${key} = $${key};`)
      .join("\n");

    const gettersSetters = Object.keys(attributes)
      .map((key) => {
        return `public function set${capitalize(key)}($${key}) {
            $this->${key} = $${key};
        }

        public function get${capitalize(key)}() {
            return $this->${key};
        }`;
      })
      .join("\n");

    const stateMethods = states
      .map((state) => {
        const transitions = state.transitions || [];
        const transitionMethods = transitions
          .map(
            (t) =>
              `    public function ${t.target_state_event}() {\n        // Transition to ${t.target_state}\n    }`
          )
          .join("\n");

        return `\n    // State: ${state.state_name}\n    public function set${capitalize(
          state.state_name
        )}() {\n        // Set state: ${state.state_value}\n    }\n${transitionMethods}`;
      })
      .join("\n");

    return `class ${className} {
${attributeDeclarations.join("\n")}

    public function __construct(${constructorParams}) {
${constructorBody}
    }
${gettersSetters}
${stateMethods}
}`;
  };

  const capitalize = (str) => {
    if (typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  };

  return (
    <div className="flex p-8 space-x-4">
      {/* Bagian Input JSON */}
      <div className="w-full md:w-1/2">
        <textarea
          id="jsonTextarea"
          readOnly
          value={jsonData}
          placeholder="JSON"
          className="p-2 text-black border border-gray-300 rounded resize-none h-64 w-full"
        ></textarea>
        <button
          className="w-full px-4 py-2 mt-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          onClick={handleParse}
        >
          Parse
        </button>
        {validationMessage && <p className="text-sm text-green-600 mt-2">{validationMessage}</p>}
        {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
      </div>

      {/* Bagian Output PHP */}
      <div className="w-full md:w-1/2">
        <textarea
          readOnly
          value={parsedData}
          placeholder="PHP Output"
          className="p-2 text-black border border-gray-300 rounded resize-none h-64 w-full"
        ></textarea>
        <button
          className="w-full px-4 py-2 mt-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          onClick={handleTranslate}
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default Panel;
