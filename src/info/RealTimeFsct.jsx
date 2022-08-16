import { useEffect, useState } from 'react';
import { getData, getRealTimeFcst, getWeatherData } from '../api/getData';
import { category, getPosition, value } from '../util';
import loadingSpinner from '../asset/loading-spinner.gif';
import styled from '@emotion/styled';

const Img = styled.img`
  display: block;
  width: 10rem;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RealTimeFcst = ({ area }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const setStates = (item, flag) => {
    setData(item);
    setIsLoading(flag);
  };

  useEffect(() => {
    getData(area, 'getUltraSrtNcst', setStates);
  }, [area]);
  return (
    <>
      {!isLoading && <Img src={loadingSpinner} alt="spinner" />}
      <FlexContainer>
        {data.map((item, index) => {
          const { category } = item;
          if (category === 'T1H' || category === 'RN1' || category === 'PTY') {
            return <Data key={category + index} data={item} />;
          }
        })}
      </FlexContainer>
    </>
  );
};

const DataDiv = styled.div`
  padding: 0.5rem;
`;

const Data = ({ data }) => {
  const key = category[data.category];
  let val;
  if (data.category === 'SKY' || data.category === 'PTY') {
    val = value[data.category][data.obsrValue];
  } else {
    val = `${data.obsrValue}${value[data.category]}`;
  }
  return (
    <DataDiv>
      {key} : {val}
    </DataDiv>
  );
};

export default RealTimeFcst;
