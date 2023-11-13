import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { useEffect } from 'react';

const Map = ({ lat, lng, size }) => {
  const containerStyle = {
    width: size.width,
    height: size.height,
  };
  useEffect(() => {
    console.log(lng);
  },[lat,lng])
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      />
    </LoadScript>
  );
};

export default Map;
