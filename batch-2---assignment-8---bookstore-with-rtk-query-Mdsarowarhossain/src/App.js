import React from "react";
import NavBar from "./components/nav/navBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import AddBook from "./components/pages/addBook";
import EditBook from "./components/pages/editBook";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
