import React, { useState } from 'react';
import ChoroplethMap from '../components/ChoroplethMap';
import InputSlider from '../components/Slider';

function SimulationCO2() {
  const [sliderValue, setSliderValue] = useState(1);

  // Logarithmic function for scaling
  const scaleFactor = (37315.18 - sliderValue * 100000 * (163.293 / 1000000)) / 37315.18

  return (
    <div className="content-container align-center">
      <div className="text-container">
        <h1>Every Tree Counts</h1>
        <p>Choose how many hectares of trees you want to plant and our simulator will tell you how much CO₂ emissions will be reduced. (1 hectare is enough space for about 1000-2000 trees, which can absorb about 16,329,300 tonnes (16.33 megatonnes) of CO₂) <br/>
        <i>Hover over a country to see its CO₂ Emissions in megatonnes (million metric tons)</i></p>
      </div>
      <ChoroplethMap scaleFactor={scaleFactor} />
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValue} labelText={"Hectares of trees (hundred thousands)"}/>
      </div>
      <div className="text-container align-left">
        <ul>
          <li> Though trees cannot completely reverse climate change, they are able to capture a significant amount of carbon during their growth. 1 hectare (10,000 square meters) of trees (about 1,000-2,000 trees) can capture approximately 163.293 tons of CO2 in the atmosphere.  </li>
          <li> There are currently around 148 million acres of land in the United States–far more globally–that are opportunities to plant trees. In the US, this land mainly consists of pasture, along with urban open spaces, grassy areas, and corridors. </li>
          <li> Oaks, Douglas firs, and redwoods are able to capture very high amounts of carbon because of their high density and long lives. </li>
          <li> Along with absorbing carbon, the forest cover that new trees can provide will create a cooling effect. Especially in the tropics, this is extremely valuable for mitigating climate change. </li>
          <li> What can I do?
            <ul>
              <li> Over 88% of all land available for reforestation is privately owned, and that could capture 492 million tonnes of CO2. This means any land you own is valuable! </li>
              <li> Plant trees on your property </li>
              <li> Encourage the building of parks and community gardens </li>
              <li> Aid in reforestation efforts around you </li>
            </ul>
            
          </li>
        </ul>
      </div>
      
    </div>
  );
}

export default SimulationCO2;
