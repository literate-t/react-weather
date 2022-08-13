import axios from 'axios';

export const getPositionFromAddress = async (location) => {
  const result = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_KEY}`
  );

  return result;
};

export const getAddressFromPosition = async (latlng) => {
  const { lat, lng } = latlng;
  const result = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_KEY}`
  );

  return result;
};

export const getRealTimeData = async () => {
  const date = new Date();
  const customDate = `${date.getFullYear()}${date.getMonth()}${date.getDate}`;
  const url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?';

  const result = await axios(
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
  );
};
