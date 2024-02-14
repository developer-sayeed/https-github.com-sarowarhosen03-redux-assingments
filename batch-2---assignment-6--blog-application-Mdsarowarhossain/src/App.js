import React from "react";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:postId" element={<Post/>} />
      </Routes>

    </Router>
  );
}

export default App;
