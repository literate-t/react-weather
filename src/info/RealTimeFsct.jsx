import { useEffect, useState } from 'react';
import { getRealTimeFcst } from '../api/getData';
import { category, getPosition, value } from '../util';
import loadingSpinner from '../asset/loading-spinner.gif';
import styled from '@emotion/styled';

const Img = styled.img`
  display: block;
  width: 10rem;
  margin: 0 auto;
`;

const RealTimeFcst = ({ area }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      setData([]);

      try {
        const { X, Y } = await getPosition(area);
        const result = await getRealTimeFcst(X, Y);
        const { item } = result.data.response.body.items;
        setData(item);
        setIsLoading(true);
      } catch (e) {
        alert('클릭한 지역의 좌표를 불러올 수 없습니다');
      }
    };

    getData();
  }, [area]);
  return (
    <div>
      {!isLoading && <Img src={loadingSpinner} alt="spinner" />}
      {data.map((item, index) => {
        const { category } = item;
        if (category === 'T1H' || category === 'RN1' || category === 'PTY') {
          return <Data key={category + index} data={item} />;
        }
      })}
    </div>
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
