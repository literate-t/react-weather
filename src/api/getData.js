import axios from 'axios';
import { format, getBaseDate, getArea, sortByFcstTime } from '../util';
// import dotenv from 'dotenv';
// dotenv.config();

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

export const getWeatherData = async (X, Y, path) => {
  const date = new Date();

  const base_url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/' + path + '?';

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

export const getData = async (area, path, setStates) => {
  setStates([], false);
  // console.log('getData');
  const resultArea = await getArea(area);
  if (resultArea) {
    const { X, Y } = resultArea;
    const result = await getWeatherData(X, Y, path);
    let { item } = result.data.response.body.items;

    if ('getUltraSrtFcst' === path) {
      item.sort((a, b) => {
        if (a.fcstTime < b.fcstTime) {
          return -1;
        }
      });
      item = sortByFcstTime(item);
    }

    setStates(item, true);
  } else {
    // to call once
    if (path === 'getUltraSrtFcst') {
      alert('클릭한 지역의 좌표를 불러올 수 없습니다');
    }
  }
};
