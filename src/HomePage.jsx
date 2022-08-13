import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPositionFromAddress } from './api/getData';
import debounce from './util/debouce';

const FlexContainer = styled.section`
  margin: 15% auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputSearch = styled.input`
  border: 1px solid black;
  border-radius: 0.4rem;
  flex-basis: 20%;
  min-height: 2rem;
  font-size: 1rem;
  ::placeholder {
    position: absolute;
    top: 50%;
    font-size: 1rem;
    transform: translateY(-0.6rem) translateX(0.3rem);
  }
`;

const InputButton = styled.button`
  background-color: white;
  border: none;
`;

const HomePage = () => {
  const [region, setRegion] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  const onSearch = async () => {
    const result = await getPositionFromAddress(region);
    const { data } = result;
    //inputRef.current.value = '';

    if (data.status === 'OK') {
      //console.log(data);
      navigate('/content', { state: data });
    } else if (inputRef.current.value !== '') {
      alert(`${inputRef.current.value} 검색어가 올바르지 않습니다.`);
      inputRef.current.value = '';
    }
  };

  const onInputChange = (e) => {
    setRegion(e.target.value);
  };

  const onKeyDown = (e) => {
    if ('Enter' === e.code) {
      onSearch();
    }
  };

  return (
    <>
      <FlexContainer>
        <InputSearch
          ref={inputRef}
          onChange={(e) => debounce(() => onInputChange(e), 50)}
          onKeyDown={onKeyDown}
          placeholder="지명 검색"
          autoFocus
        />
        <InputButton onClick={onSearch}>
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </InputButton>
      </FlexContainer>
    </>
  );
};

export default HomePage;
