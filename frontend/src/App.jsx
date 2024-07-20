import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/HomePage";
import NotesPage from "./views/NotesPage";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Notes" element={<NotesPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
