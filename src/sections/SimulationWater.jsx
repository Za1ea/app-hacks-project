import React, { useState } from 'react';
import ChoroplethMap from '../components/ChoroplethMap';
import InputSlider from '../components/Slider';

function SimulationWater() {
  const [sliderValue, setSliderValue] = useState(1);

  // Logarithmic function for scaling
  const scaleFactor = (37315.18 - sliderValue * 1000000 * (18 / 1000000)) / 37315.18

  return (
    <div className="content-container align-center">
      <h1>Every Gallon Counts</h1>
      <p>See how much the global CO₂ emissions drop based on how many gallons of water are conserved. (Every 1 billion gallons conserved, or 3.78 million cubic meters of water, saves about 18 megatonnes of carbon emissions annually)<br/>
      <i>Hover over a country to see its CO₂ Emissions in megatonnes (million metric tons)</i></p>
      <ChoroplethMap scaleFactor={scaleFactor} />
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValue} page={"water"} labelText={"Gallons of water saved (billions)"} maxValue={1000}/>
      </div>
      <div className="text-container align-left">  
        <ul>
            <li> About every cubic meter of water consumed generates 10.5 kg of carbon emissions, or around 85 pounds of carbon for every 1,000 gallons of water. (For reference, there is about 2,500 cubic meters of water in one Olympic swimming pool) </li>
            <li> The entire world uses 4.3 trillion cubic meters, or 10 billion tonnes, of freshwater every single day. </li>
            <li> The use of smart water management technologies can catch leaks, malfunctions, and human errors that can eliminate unnecessary water waste </li>
            <li> Household leaks can waste approximately nearly 900 billion gallons of water annually in the US alone. </li>
            <li> Water and water waste accounts for 30-40 percent or more of public energy consumption
                <ul>
                    <li> Approximately 25 percent of all water in the built environment is wasted </li>
                </ul>
            </li>
            <li> Smart irrigation systems eliminate outdated and inefficient irrigation systems by tailoring watering and run times to the specific landscape, cutting off water at the moment it is no longer needed </li>
            <li> What can I do?
                <ul>
                    <li> Fix leaks, address anything around the house that is wasting water </li>
                    <li> Use smart irrigation, limit yard/garden watering hours to morning and evening </li>
                    <li> Use cold water for washing laundry to save energy </li>
                    <li> Landscape your yard with plants that are drought resistant or suited to regional climate/precipitation levels
                    </li>
                </ul>
                
            </li>

        </ul>

      </div>
      
    </div>
  );
}

export default SimulationWater;