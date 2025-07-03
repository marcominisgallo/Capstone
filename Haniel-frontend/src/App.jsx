import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HNavbar from "./components/HNavbar";
import HFooter from "./components/HFooter";
import HWhoWeAre from "./components/HWhoWeAre";
import HHome from "./components/HHome";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="app">
        <BrowserRouter>
          <HNavbar />
          <div id="main-content">
            <Routes>
              <Route path="/" element={<HHome />} />
              <Route path="/chi-siamo" element={<HWhoWeAre />} />
            </Routes>
          </div>
          <HFooter />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
