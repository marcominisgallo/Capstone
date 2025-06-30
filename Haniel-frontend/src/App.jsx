import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import HNavbar from "./components/HNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HNavbar />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
