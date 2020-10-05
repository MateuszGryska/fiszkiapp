// import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.fontGrey};
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default Title;
