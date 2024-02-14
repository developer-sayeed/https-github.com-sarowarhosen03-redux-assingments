import React from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import NavBar from "./nav/navBar";
import Home from "./pages/home";
import AddJob from "./pages/addJob";
import EditJob from "./pages/editJob";
function App() {
  return (
    <Router>
      <NavBar >
      <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/addJob" element={<AddJob/>} />
      <Route path="/editJob/:id" element={<EditJob/>} />

      </Routes>
      </NavBar>
      
     
    </Router>
  );
}

export default App;
