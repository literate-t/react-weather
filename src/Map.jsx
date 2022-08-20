import { useEffect, useRef, useState } from 'react';
import { formatAddress } from './util';

let map;
let marker;
let geocoder;

const Map = ({ location, onClickArea }) => {
  const divRef = useRef();
  const { kakao } = window;
  const [position, setPosition] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  useEffect(() => {
    let options = {
      center: new kakao.maps.LatLng(location.lat, location.lng), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };

    map = new kakao.maps.Map(divRef.current, options);

    marker = new kakao.maps.Marker({
      map,
    });

    kakao.maps.event.addListener(map, 'click', (e) => {
      const { La, Ma } = e.latLng;
      setPosition({ ...position, lat: Ma, lng: La });
    });

    geocoder = new kakao.maps.services.Geocoder();

    return () => marker.setMap(null);
  }, []);

  useEffect(() => {
    marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(position.lat, position.lng),
    });

    const getData = async () => {
      const { lat, lng } = position;
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const data = result[0];
          const { region_1depth_name, region_2depth_name, region_3depth_name } =
            data.address;
          const address = formatAddress(
            region_1depth_name,
            region_2depth_name,
            region_3depth_name
          );
          onClickArea(address);
        }
      });
    };

    getData();

    return () => marker.setMap(null);
  }, [position]);

  return (
    <>
      <div
        ref={divRef}
        style={{
          width: '90vw',
          height: '60vh',
          border: '1px solid black',
          borderRadius: '0.5rem',
        }}
      ></div>
    </>
  );
};

export default Map;
