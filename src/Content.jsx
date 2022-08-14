import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Map from './Map';
import { useState, useEffect } from 'react';

const FlexContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DivAddress = styled.div``;

const NavContainer = styled.nav``;

let myState;

const Content = () => {
  const { state } = useLocation();
  if (state) {
    myState = state;
  }
  useEffect(() => {}, []);
  const [area, setArea] = useState('');
  const onClickArea = (area) => {
    setArea(area);
  };

  let loc = { lat: 37.60753611111111, lng: 126.9341888888889 };
  if (myState) {
    const data = myState.results[0];
    const { location } = data.geometry;
    loc = location;
  }

  return (
    <FlexContainer>
      <h1>Content</h1>
      <Map location={loc} onClickArea={onClickArea} />
      <br />
      <DivAddress>{area}</DivAddress>
      <br />
      <Link to="/">뒤로 가기</Link>
      <br />
      {/* 
        지도에 위치를 찍자마자
        실황과 예보 같이 보여주기
        <RealTime />
        <Expect />
       */}
      {/* <NavContainer>
        <Link style={{ paddingRight: '0.5rem' }} to="/content/real-time">
          실황
        </Link>
        <Link to="/content/fast-expect">예보</Link>
      </NavContainer>
      <Outlet /> */}
    </FlexContainer>
  );
};

export default Content;
