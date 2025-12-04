import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-200 min-h-screen">
        <h1 className="text-6xl">Platera</h1>
        <h2 className="text-xl">Find local flavor. Anywhere</h2>
      </div>
    </>
  );
}

export default App;
