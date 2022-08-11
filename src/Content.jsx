import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Map from './Map';
import { useState } from 'react';
const FlexContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DivAddress = styled.div``;
const Content = () => {
  const { state } = useLocation();
  const [area, setArea] = useState('');
  const onClickArea = (area) => {
    setArea(area);
  };

  const data = state.results[0];
  const { location } = data.geometry;

  return (
    <FlexContainer>
      <h1>Content</h1>
      <Map location={location} onClickArea={onClickArea} />
      <br />
      <DivAddress>{area}</DivAddress>
      <br />
      <Link to="/">뒤로 가기</Link>
    </FlexContainer>
  );
};

export default Content;
