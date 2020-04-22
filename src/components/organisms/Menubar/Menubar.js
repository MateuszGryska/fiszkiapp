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
`;

const Menubar = () => (
  <StyledWrapper>
    <h1>test</h1>
  </StyledWrapper>
);

export default Menubar;
