import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Map from './Map';
import { useState, useEffect } from 'react';
import RealTimeFcst from './info/RealTimeFsct';
import ShortTimeNcst from './info/ShortTimeNcst';
import Footer from './Footer';
import { formatAddress } from './util';

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

const Content = () => {
  const { kakao } = window;
  const { state } = useLocation();
  const { formatted_address } = state.results[0];
  const resultStr = formatted_address.split(' ').slice(1).join(' ');
  //console.log(state.results[0]);
  const [address, setAddress] = useState('');

  // if (state) {
  //   myState = state;
  // }

  //let loc; // = { lat: 37.60753611111111, lng: 126.9341888888889 };

  const result = state.results[0];
  const { location } = result.geometry;

  const onClickArea = (area) => {
    setAddress(area);
  };

  return (
    <FlexContainer>
      <DivMap>
        <Map location={location} onClickArea={onClickArea} />
      </DivMap>
      <br />
      <DivAddress>{address}</DivAddress>

      <br />
      <DivInfo>
        <DivRealTime>
          {address && <RealTimeFcst address={address} />}
        </DivRealTime>
        <DivExpect>{address && <ShortTimeNcst address={address} />}</DivExpect>
      </DivInfo>
      <Link to="/">뒤로 가기</Link>
      <br />
      <Footer />
    </FlexContainer>
  );
};

export default Content;
