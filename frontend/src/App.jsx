import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import SafetyTips from "./pages/SafetyTips/Safetytips";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/safety" element={<SafetyTips />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
