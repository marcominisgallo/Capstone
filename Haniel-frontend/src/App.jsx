import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HNavbar from "./components/HNavbar";
import HFooter from "./components/HFooter";
import HWhoWeAre from "./components/HWhoWeAre";
import HHome from "./components/HHome";
import HContactS from "./components/HContactS";
import HLogin from "./components/HLogin";
import HBook from "./components/HBook";
import HServicesOffered from "./components/HServicesOffered";
import HAdminApp from "./components/HAdminApp";
import HAllApp from "./components/HAllApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="app">
        <BrowserRouter>
          <HNavbar />
          <div
            id="main-content"
            className=" border-bottom border-2 border-black mb-4"
          >
            <Routes>
              <Route path="/" element={<HHome />} />
              <Route path="/chi-siamo" element={<HWhoWeAre />} />
              <Route path="/contatti" element={<HContactS />} />
              <Route path="/login" element={<HLogin />} />
              <Route path="/prenota" element={<HBook />} />
              <Route path="servizi-offerti" element={<HServicesOffered />} />
              <Route path="/admin-app" element={<HAdminApp />} />
              <Route path="/all-app" element={<HAllApp />} />
            </Routes>
          </div>
          <HFooter />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
