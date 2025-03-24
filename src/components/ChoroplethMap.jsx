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
    return co2 > 4000
      ? '#360000'
      : co2 > 1000
      ? '#5c080a'
      : co2 > 832
      ? '#610416'
      : co2 > 666
      ? '#730123'
      : co2 > 500
      ? '#7D1029'
      : co2 > 350
      ? '#87202F'
      : co2 > 200
      ? '#912F35'
      : co2 > 150
      ? '#9B3F3B'
      : co2 > 100
      ? '#A54E41'
      : co2 > 75
      ? '#AF5E47'
      : co2 > 50
      ? '#B96D4D'
      : co2 > 35
      ? '#C27C52'
      : co2 > 20
      ? '#CC8C58'
      : co2 > 15
      ? '#D69B5E'
      : co2 > 10
      ? '#EABA6A'
      : co2 > 5
      ? '#F4CA70'
      : co2 > 0
      ? '#ffeab3'
      : '#FFFFDC';
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
    <MapContainer key={scaleFactor} center={[20, 0]} zoom={2} style={{ width: '100%', height: '80%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
      <div style={{
      position: 'absolute',
      marginTop: '30em',
      marginLeft: '1em',
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#222',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      zIndex: 1100
    }}>
      Total Emissions: {totalEmissions.toFixed(2)} Megatonnes
    </div>
  </MapContainer>
  );
}

export default ChoroplethMap;