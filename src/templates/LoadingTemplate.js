import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

const StyledWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background: rgb(104, 163, 86);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.8rem;
  color: white;
`;

const LoadingTemplate = () => (
  <StyledWrapper>
    <LoadingSpinner />
  </StyledWrapper>
);

export default LoadingTemplate;
