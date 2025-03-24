import React, { useState } from 'react';
import ChoroplethMap from '../components/ChoroplethMap';
import InputSlider from '../components/Slider';

function SimulationCO2() {
  const [sliderValueTree, setSliderValueTree] = useState(1);
  const [sliderValueBus, setSliderValueBus] = useState(1);
  const [sliderValueWater, setSliderValueWater] = useState(1);

  // Logarithmic function for scaling
  const scaleFactor = (37315.18 - sliderValueTree * 16.3293 - sliderValueBus * 2 - sliderValueWater * 18) / 37315.18

  return (
    <div className="content-container align-center">
      <div className="text-container">
        <h1>Every Effort Counts</h1>
        <p>Simulate reduction of CO₂ emissions by planting trees, switching people to public transportation, and conserving water. </p>
            <ul className="align-left">
                <li>Every 1 billion gallons conserved, or 3.78 million cubic meters of water, saves about 18 megatonnes of carbon emissions annually</li>
                <li>100,000 hectares is enough space for about 100-200 million trees, which can absorb about 16,329,300 tonnes (16.33 megatonnes) of CO₂</li>
                <li>1 million people switching to public transportation would save about 2 megatonnes of carbon emissions annually</li>
            </ul>
        <p><i>Hover over a country to see its CO₂ Emissions in megatonnes (million metric tons)</i></p>
      </div>
      <ChoroplethMap scaleFactor={scaleFactor} />
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValueWater} page={"water"} labelText={"Gallons of water saved (billions)"} maxValue={1000}/>
      </div>
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValueTree} labelText={"Hectares of trees (hundred thousands)"} maxValue={500}/>
      </div>
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValueBus} page={"transportation"} labelText={"People switching to public transportation (millions)"} maxValue={1000}/>
      </div>
      
    </div>
  );
}

export default SimulationCO2;
