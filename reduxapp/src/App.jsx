import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import EditUserDetails from "./pages/edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditUserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
