import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Menu';
import Footer from './components/Footer';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/About" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
