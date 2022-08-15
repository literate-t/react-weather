import axios from 'axios';
import { format, getBaseDate } from '../util';

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

export const getRealTimeFcst = async (X, Y) => {
  const date = new Date();

  const base_url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?';

  const params = new URLSearchParams({
    ServiceKey: process.env.REACT_APP_DATA_PORTAL_DECODING_KEY,
    pageNo: 1,
    numOfRows: 1000,
    dataType: 'JSON',
    base_date: getBaseDate(),
    base_time: `${format(date.getHours() - 1)}00`,
    nx: X,
    ny: Y,
  });

  const url = base_url + params.toString();

  const result = await axios(url);

  return result;
};

export const getShortNcst = async () => {};
