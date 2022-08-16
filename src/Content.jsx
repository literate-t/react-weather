import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Map from './Map';
import { useState, useEffect } from 'react';
import RealTimeFcst from './info/RealTimeFsct';
import ShortTimeNcst from './info/ShortTimeNcst';
import Footer from './Footer';

const FlexContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DivAddress = styled.div``;

const DivInfo = styled.nav`
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const DivRealTime = styled.div`
  flex-basis: 10%;
  border: 1px solid black;
  margin: 0.25rem;
  flex-grow: 1;

  @media screen and (max-width: 50rem) {
    flex-basis: 100%;
  }
`;

const DivExpect = styled.div`
  border: 1px solid black;
  flex-basis: 50%;
  flex-grow: 1;
  margin: 0.25rem;
`;

const DivMap = styled.div`
  margin-top: 1.5%;
`;

let myState;

const Content = () => {
  const { state } = useLocation();
  //const [data, setData] = useState(state);
  if (state) {
    myState = state;
  }

  const [area, setArea] = useState('');

  const onClickArea = (area) => {
    setArea(area);
  };

  let loc = { lat: 37.60753611111111, lng: 126.9341888888889 };
  if (myState) {
    const result = myState.results[0];
    const { location } = result.geometry;
    loc = location;
  }

  return (
    <FlexContainer>
      <DivMap>
        <Map location={loc} onClickArea={onClickArea} />
      </DivMap>
      <br />
      <DivAddress>{area}</DivAddress>

      <br />
      <DivInfo>
        <DivRealTime>
          <RealTimeFcst area={area} />
        </DivRealTime>
        <DivExpect>
          <ShortTimeNcst area={area} />
        </DivExpect>
      </DivInfo>
      <Link to="/">뒤로 가기</Link>
      <br />
      <Footer />
    </FlexContainer>
  );
};

export default Content;
