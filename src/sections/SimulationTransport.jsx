import React, { useState } from 'react';
import ChoroplethMap from '../components/ChoroplethMap';
import InputSlider from '../components/Slider';

function SimulationTransport() {
  const [sliderValue, setSliderValue] = useState(1);

  // Logarithmic function for scaling
  const scaleFactor = (37315.18 - sliderValue * 1000000 * (2 / 1000000)) / 37315.18

  return (
    <div className="content-container align-center">
      <h1>Every Commute</h1>
      <p>See how much the global CO₂ Emissions drop based on how many people switch to public transportation using the slider below. (One person switching saves 2 tonnes of carbon emissions annually)<br/>
      <i>Hover over a country to see its CO₂ Emissions in megatonnes (million metric tons)</i></p>
      <ChoroplethMap scaleFactor={scaleFactor} />
      <div style={{ display: "flex" }}>
        <InputSlider onChange={setSliderValue} page={"transportation"} labelText={"People switching to public transportation (millions)"} maxValue={2000}/>
      </div>
      <div className="text-container align-left">  
        <ul>
            <li> A typical long haul flight (a flight typically lasting around 6-7 hours) is, on average, almost 2 tons of carbon dioxide emissions </li>
            <li> Shifting from cars to public transport can reduce around 2.2 tons of carbon emissions annually per person </li>
            <li> Public transportation is one of the most cost-effective ways to address greenhouse gas emissions, as buses and trains can reduce emission by up to ⅔ per passenger, per kilometer. </li>
            <li> Electric vehicles can reduce your carbon footprint by an average of 2 tons per year
                <ul>
                <sub> It is better to buy a second hand Electric Vehicle, as manufacturing new Electric Vehicles requires a high amount of minerals and precious metals </sub>
                </ul>
            </li>
            <li> What can I do?
                <ul>
                    <li> Take buses, trains, or bike whenever possible </li>
                    <li> Promote infrastructure for public transport in your city or county </li>
                    <li> Carpool with friends </li>
                    <li> Stay local for school and shopping to limit commuting distance </li>
                </ul>
            </li>
            <li> To preserve a livable climate, the average annual carbon emissions per person needs to drop from 6.3 tons to 2.1 tons by 2030 </li>
        </ul>
      </div>
      
    </div>
  );
}

export default SimulationTransport;
