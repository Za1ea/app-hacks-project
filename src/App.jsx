import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './sections/Home';
import Navbar from './components/Navbar'; // Import Navbar
import SimulationCO2 from './sections/SimulationCO2';
import SimulationTransport from './sections/SimulationTransport';
import SimulationWater from './sections/SimulationWater';
import SimulationAll from './sections/SimulationAll'

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/every-tree" element={<SimulationCO2 />} />
        <Route path="/every-commute" element={<SimulationTransport />} />
        <Route path="/every-gallon" element={<SimulationWater />} />
        <Route path="/every-effort" element={<SimulationAll />} />
      </Routes>

    </Router>
  );
}

export default App;
