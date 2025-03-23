import React from 'react';
import ChoroplethMap from '../components/ChoroplethMap';

function SimulationCO2() {
  return (
    <div>
      <h1>Tree Planting Simulator</h1>
      <p>Choose how many trees you want to plant and our simulator will tell you how CO2 emissions will be affected</p>
      <ChoroplethMap />
    </div>
  );
}

export default SimulationCO2;
