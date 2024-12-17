import React, { useState } from "react";
import Header from "./component/Header.jsx";
import Input from "./component/Input.jsx";
import Panel from "./component/Panel.jsx";
import Help from "./component/Help.jsx";
import Info from "./component/Info.jsx";

function App() {
  const [jsonData, setJsonData] = useState(""); 

  return (
    <div className="h-screen w-full bg-gray-100 items-center">
      <Header />
      <Input setJsonData={setJsonData} /> 
      <Panel jsonData={jsonData} /> 
      <Help />
      <Info />
    </div>
  );
}

export default App;
