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
    console.log('if state');
    myState = state;
  }
  useEffect(() => {
    console.log('useEffect');
  }, []);
  const [area, setArea] = useState('');
  const onClickArea = (area) => {
    setArea(area);
  };

  console.log({ myState });
  const data = myState.results[0];
  const { location } = data.geometry;

  return (
    <FlexContainer>
      <h1>Content</h1>
      <Map location={location} onClickArea={onClickArea} />
      <br />
      <DivAddress>{area}</DivAddress>
      <br />
      <Link to="/">뒤로 가기</Link>
      <br />
      <NavContainer>
        <Link style={{ paddingRight: '0.5rem' }} to="/content/real-time">
          실황
        </Link>
        <Link to="/content/fast-expect">예보</Link>
      </NavContainer>
      <Outlet />
    </FlexContainer>
  );
};

export default Content;
