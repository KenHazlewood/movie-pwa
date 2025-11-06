import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <h1 className="text-xl font-bold">MovieFinder PWA</h1>
        <div>
          <Link to="/" className="px-2">Home</Link>
          <Link to="/search" className="px-2">Search Movies</Link>
        </div>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<MovieSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
