import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojson from '../assets/countries.geo.json'; // GeoJSON file of world countries
import emissionsData from '../assets/co2-emissions.json'; // CO2 emissions data by country

import 'leaflet/dist/leaflet.css';

function ChoroplethMap({ scaleFactor }) {
  const [geoData, setGeoData] = useState(null);
  const [co2Data, setCo2Data] = useState(null);
  const [totalEmissions, setTotalEmissions] = useState(0); 

  console.log(scaleFactor)

  const calculateTotalEmissions = (data) => {
    return Object.values(data).reduce((acc, val) => acc + val, 0);
  };

  useEffect(() => {
    setCo2Data(emissionsData); // Load CO2 data from your source
  }, []);

  useEffect(() => {
    console.log("update")
    setTotalEmissions(calculateTotalEmissions(emissionsData) * scaleFactor);

    const getGeoJsonData = () => {
      return geojson.features.map((feature) => {
        const country = feature.properties.name;
        const co2Emission = (emissionsData[country] || 0) * scaleFactor;
        return {
          ...feature,
          properties: { ...feature.properties, co2: co2Emission },
        };
      });
    };

    setGeoData(getGeoJsonData());
  }, [scaleFactor]);
  

  // Function to merge GeoJSON and CO2 data
  // const getGeoJsonData = () => {
  //   // Merge emissions data into GeoJSON
  //   const updatedGeoJson = geojson.features.map((feature) => {
  //     const country = feature.properties.name; 
  //     const co2Emission = (co2Data[country] || 0) * scaleFactor; // Default to 0 if data is missing

  //     // Add the CO2 emission data to the GeoJSON properties
  //     feature.properties.co2 = co2Emission;
  //     return {
  //       ...feature,
  //       properties: { ...feature.properties, co2: co2Emission },
  //     };
  //   });

  //   return updatedGeoJson;
  // };

  // Define color scale for emissions
  const getColor = (co2) => {
    return co2 > 10000 
    ? '#520000'
    : co2 > 4000 
    ? '#6F150C'
    : co2 > 2000 
    ? '#8F2A17'
    : co2 > 1000 
    ? '#A03F23'
    : co2 > 900 
    ? '#CC552F'
    : co2 > 800 
    ? '#D26A3B'
    : co2 > 700 
    ? '#E97F46'
    : co2 > 600 
    ? '#FF9452' 
    : co2 > 500 
    ? '#FFA66F'
    : co2 > 400
    ? '#FFB88C' 
    : co2 > 300 
    ? '#FFCAA9' 
    : co2 > 250 
    ? '#FFDBC5' 
    : co2 > 200 
    ? '#FFEDE2' 
    : co2 > 150 
    ? '#EEFFFF'
    : co2 > 100 
    ? '#C7F0FF'
    : co2 > 75 
    ? '#AFE1FF' 
    : co2 > 50 
    ? '#87D1FF' 
    : co2 > 40 
    ? '#5FC2FF'
    : co2 > 30 
    ? '#53A6EC'
    : co2 > 20 
    ? '#478BD8' 
    : co2 > 15 
    ? '#3B6FC5' 
    : co2 > 10 
    ? '#2F54B2' 
    : co2 > 5 
    ? '#23389F' 
    : co2 > 0 
    ? '#171D8B' 
    : '#0B0178'; 
  };

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.co2),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    // Tooltip shows on hover, styled like a popup
    layer.bindTooltip(
      `<div class="info"><h4>${feature.properties.name}</h4><p>${feature.properties.co2.toFixed(2)} Megatonnes</p></div>`,
      { sticky: true, direction: "top", opacity: 0.9 }
    );
  
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.9,
        });
        layer.bringToFront();
        layer.openTooltip(); // Open tooltip on hover
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        });
        layer.closeTooltip(); // Close tooltip when mouse leaves
      },
    });
  };  

  if (!geoData || !co2Data) return <div>Loading...</div>;

  return (
    <MapContainer key={scaleFactor} center={[20, 0]} zoom={2} style={{ width: '100%', height: '75%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
      <div style={{
        position: 'absolute',
        marginTop: '26em',
        marginLeft: '2em',
        background: 'rgba(255, 255, 255, 0.7)',
        color: '#222',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 1100
      }}>
        Total CO₂ Emissions: {totalEmissions.toFixed(2)} Megatonnes
      </div>
       {/* Gradient Legend */}
      <div style={{
        position: 'absolute',
        bottom: '2em',
        marginLeft: '66em',
        background: 'rgba(255, 255, 255, 0.7)',
        color: "black",
        padding: '0% 1% 1% 1%',
        borderRadius: '5px',
        zIndex: 1100
      }}>
        <h4>CO₂ Emissions (Megatonnes)</h4>
        <div style={{
          width: '150px',
          height: '10px',
          background: 'linear-gradient(to left, #620000, #78150C, #8F2A17, #A03F23, #CC552F, #D26A3B, #E97F46, #FF9452, #FFA66F, #FFB88C, #FFCAA9, #FFDBC5, #FFEDE2, #EEFFFF, #C7F0FF, #AFE1FF, #87D1FF, #5FC2FF, #53A6EC, #478BD8, #3B6FC5, #2F54B2, #23389F, #171D8B, #0B0178)',
          marginBottom: '5px'
        }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1em' }}>
          <span>0</span>
          <span>15</span>
          <span>100</span>
          <span>400</span>
          <span>4000+</span>
        </div>
      </div>
  </MapContainer>
  );
}

export default ChoroplethMap;