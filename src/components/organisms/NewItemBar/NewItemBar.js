import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: -10px 3px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  z-index: 1000;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out; */
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
`;

const NewItemBar = () => (
  <StyledWrapper>
    <StyledTitle>Add new item</StyledTitle>
  </StyledWrapper>
);

export default NewItemBar;
