import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import HNavbar from "./components/HNavbar";
import HFooter from "./components/HFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HNavbar />
        <Routes></Routes>
        <HFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
