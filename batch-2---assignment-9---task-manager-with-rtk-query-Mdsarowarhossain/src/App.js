import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/addTask";
import EditTask from "./pages/editTask";
import Home from "./pages/home";
import NavBar from "./components/nav/navBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addNew" element={<AddTask />} />
        <Route path="/editTask/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
