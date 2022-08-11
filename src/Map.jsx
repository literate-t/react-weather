/* eslint-disable no-undef */

import { getAddressFromPosition } from './api/getData';
import { useEffect, useRef, useState } from 'react';

const Map = ({ location, onClickArea }) => {
  const divRef = useRef();
  const { lat, lng } = location;
  const { kakao } = window;
  const [position, setPosition] = useState({
    lat,
    lng,
  });

  let map;
  let marker;

  // useEffect(() => {
  //   let options = {
  //     center: new kakao.maps.LatLng(position.lat, position.lng), //지도의 중심좌표.
  //     level: 3, //지도의 레벨(확대, 축소 정도)
  //   };

  //   map = new kakao.maps.Map(divRef.current, options);

  //   marker = new kakao.maps.Marker({
  //     map,
  //     position: new kakao.maps.LatLng(position.lat, position.lng),
  //   });
  // }, []);

  useEffect(() => {
    let options = {
      center: new kakao.maps.LatLng(position.lat, position.lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    map = new kakao.maps.Map(divRef.current, options);

    marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(position.lat, position.lng),
    });

    kakao.maps.event.addListener(map, 'click', (e) => {
      const { La, Ma } = e.latLng;
      setPosition({ ...position, lat: Ma, lng: La });
    });

    return () => marker.setMap(null);
  }, [position]);

  useEffect(() => {
    const getData = async () => {
      const result = await getAddressFromPosition(position);
      const address = result.data.results[0].formatted_address;
      onClickArea(address);

      console.log(address);
    };
    getData();
  }, [position]);

  return (
    <div
      ref={divRef}
      style={{
        width: '90vw',
        height: '60vh',
        border: '1px solid black',
        borderRadius: '0.5rem',
      }}
    ></div>
  );
};

export default Map;
