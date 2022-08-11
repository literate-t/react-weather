import axios from 'axios';

export const getPositionFromAddress = async (location) => {
  const result = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GEOCODING_KEY}`
  );

  return result;
};

export const getAddressFromPosition = async (latlng) => {
  const { lat, lng } = latlng;
  const result = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GEOCODING_KEY}`
  );

  return result;
};
