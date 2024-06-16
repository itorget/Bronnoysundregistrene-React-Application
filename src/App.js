import React from "react";
import "./App.css";
import BrregData from "./BrregData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnhetDetaljer from "./EnhetDetaljer";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<BrregData />} />
            <Route path="/enhet/:orgNr" element={<EnhetDetaljer />} />
          </Routes>
        </header>
        <footer className="App-footer">
          <p>
            Utviklet{" "}
            <a
              href="https://nasdag.no"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASDAG media og IT
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
