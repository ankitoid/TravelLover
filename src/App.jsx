import React from "react";

import Tempate from "./Pages/Template";
import { HomeIcon } from "lucide-react";
import Homepage from "./components/Homepage";
// import FirstTemplate from "./Pages/FirstTemplate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LearnHook from "./Hooq/LearnHook";
import Props from "./Hooq/Props";
import LocationsPage from "./Pages/LocationsPage";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Tempate />} />
        <Route path="/LearnHook" element={<LearnHook />} />
        <Route path="/propss" element={<Props />} />
        <Route path="/locations-lage" element={<LocationsPage />} />
      </Routes>
  
    </Router>
  );
}

export default App;
