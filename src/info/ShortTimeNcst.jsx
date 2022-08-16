import { useEffect, useState } from 'react';
import { getData } from '../api/getData';
import loadingSpinner from '../asset/loading-spinner.gif';
import styled from '@emotion/styled';
import { category, sortByFcstTime, value } from '../util';

const Img = styled.img`
  display: block;
  width: 10rem;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ShortTimeNcst = ({ address }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const setStates = (item, flag) => {
    setData(item);
    setIsLoading(flag);
  };

  useEffect(() => {
    getData(address, 'getUltraSrtFcst', setStates);
  }, [address]);

  useEffect(() => {
    //console.log(data);
  }, [data]);

  return (
    <>
      {!isLoading && <Img src={loadingSpinner} alt="spinner" />}
      <FlexContainer>
        {data.map((item, index) => (
          <Data key={Object.keys(item)[0]} data={item} />
        ))}
      </FlexContainer>
    </>
  );
};

const DataDiv = styled.div`
  padding: 0.5rem;
  flex-basis: 40%;

  @media screen and (max-width: 60rem) {
    flex-basis: 100%;
    text-align: center;
  }
`;

const Data = ({ data }) => {
  const fcstTime = Object.keys(data)[0];
  const { SKY, PTY, RN1, T1H } = data[fcstTime];
  const val = `${value.PTY[PTY]} / ${value.SKY[SKY]} / 1시간 강수량: ${RN1}`;

  return (
    <DataDiv>
      <h1 style={{ display: 'inline', marginRight: '1%' }}>{fcstTime}</h1>
      {val}
    </DataDiv>
  );
};

export default ShortTimeNcst;
