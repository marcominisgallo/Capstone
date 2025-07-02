import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HNavbar from "./components/HNavbar";
import HFooter from "./components/HFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HNavbar />
        <Routes>{/*<Route path="/chi-siamo" element={} />*/}</Routes>
        <HFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
