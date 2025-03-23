import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojson from '../assets/countries.geo.json'; // GeoJSON file of world countries
import emissionsData from '../assets/co2-emissions.json'; // CO2 emissions data by country

import 'leaflet/dist/leaflet.css';

function ChoroplethMap() {
  const [geoData, setGeoData] = useState(null);
  const [co2Data, setCo2Data] = useState(null);

  // Function to merge GeoJSON and CO2 data
  const getGeoJsonData = () => {
    // Merge emissions data into GeoJSON
    const updatedGeoJson = geojson.features.map((feature) => {
      const country = feature.properties.name;
      console.log(country)
      const co2Emission = co2Data[country] || 0; // Default to 0 if data is missing

      // Add the CO2 emission data to the GeoJSON properties
      feature.properties.co2 = co2Emission;
      return feature;
    });

    return updatedGeoJson;
  };

  // Define color scale for emissions
  const getColor = (co2) => {
    return co2 > 1000
      ? '#800026'
      : co2 > 500
      ? '#BD0026'
      : co2 > 200
      ? '#E31A1C'
      : co2 > 100
      ? '#FC4E2A'
      : co2 > 50
      ? '#FD8D3C'
      : co2 > 20
      ? '#FEB24C'
      : co2 > 10
      ? '#FED976'
      : '#FFEDA0';
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
    // Add popup on hover
    layer.bindPopup(`${feature.properties.name}: ${feature.properties.co2} CO₂ Emissions`);
  };

  useEffect(() => {
    setCo2Data(emissionsData); // Load CO2 data from your source
    console.log(co2Data)
  }, []);
  
  useEffect(() => {
    if (co2Data) {
      setGeoData(getGeoJsonData()); // Update GeoJSON only after co2Data is set
    }
  }, [co2Data]);
  

  if (!geoData || !co2Data) return <div>Loading...</div>;

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ width: '20vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}

export default ChoroplethMap;