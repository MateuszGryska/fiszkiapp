import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  min-height: 350px;
  min-width: 400px;
  box-shadow: 0px 15px 20px 0 rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.main};
  border-radius: 20px 20px 0 0;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const Note = () => (
  <StyledWrapper>
    <StyledTitle>Title for note</StyledTitle>
  </StyledWrapper>
);

export default Note;
