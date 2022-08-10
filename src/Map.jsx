/* eslint-disable no-undef */

import { useEffect, useRef } from 'react';
const Map = () => {
    const divRef = useRef();

    useEffect(() => {
        let options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3, //지도의 레벨(확대, 축소 정도)
        };
        new kakao.maps.Map(divRef.current, options);
    });

    return <div ref={divRef} style={{ width: '30rem', height: '20rem' }}></div>;
};

export default Map;
