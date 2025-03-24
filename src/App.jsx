import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './sections/Home';
import Navbar from './components/Navbar'; // Import Navbar
import SimulationCO2 from './sections/SimulationCO2';

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/every-tree" element={<SimulationCO2 />} />
      </Routes>
    </Router>
  );
}

export default App;
