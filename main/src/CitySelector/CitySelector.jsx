import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => {
          setStates(response.data);
        })
        .catch(error => {
          console.error(`Error fetching states for ${selectedCountry}:`, error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => {
          setCities(response.data);
        })
        .catch(error => {
          console.error(`Error fetching cities for ${selectedState}, ${selectedCountry}:`, error);
        });
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>City Selector</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default CitySelector;
