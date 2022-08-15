import data from '../api/data.json';

let timerId;
export const debounce = (callback, time) => {
  clearTimeout(timerId);
  timerId = setTimeout(callback, time);
};
export const format = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};
export const getBaseDate = () => {
  const date = new Date();
  return `${date.getFullYear()}${format(date.getMonth() + 1)}${format(
    date.getDate()
  )}`;
};

const region = {
  서울: '서울특별시',
  인천: '인천광역시',
  대전: '대전광역시',
  광주: '광주광역시',
  대구: '대구광역시',
  울산: '울산광역시',
  부산: '부산광역시',
  세종특별자치시: '세종특별자치시',
  제주특별자치도: '제주특별자치도',
  경기: '경기도',
  충북: '충청북도',
  충남: '충청남도',
  전북: '전라북도',
  전남: '전라남도',
  경북: '경상북도',
  경남: '경상남도',
  강원: '강원도',
};

const removeSpace = (str) => {
  return str.replace(' ', '');
};

const getFirstAddress = (str) => {
  return str.split(' ')[0];
};

export const formatAddress = (
  r_1_depth_name,
  r_2_depth_name,
  r_3_depth_name
) => {
  const region_1 = region[r_1_depth_name];
  const region_2 = removeSpace(r_2_depth_name);
  const region_3 = getFirstAddress(r_3_depth_name);

  return `${region_1} ${region_2} ${region_3}`;
};

export const getPosition = async (area) => {
  const region = area.split(' ');

  const result = data.find((item) => {
    if (
      item['시도'] === region[0] &&
      item['시군구'] === region[1] &&
      item['읍면동'] === region[2]
    ) {
      return item;
    }
  });
  return result;
};

export const category = {
  T1H: '기온',
  RN1: '1시간 강수량',
  PTY: '강수 형태',
  SKY: '하늘 상태',
};

export const value = {
  SKY: {
    1: '맑음',
    3: '구름 많음',
    4: '흐림',
  },
  PTY: {
    0: '해당 사항 없음',
    1: '비',
    2: '비/눈',
    3: '눈',
    4: '소나기',
  },
  RN1: 'mm',
  T1H: '°',
};
