import React from 'react';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.button`
  height: 50px;
  width: 270px;
  border-radius: 20px;
  border: none;
  margin-top: 30px;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  letter-spacing: 2.5px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.main};
    box-shadow: 0px 15px 20px rgba(46, 80, 229, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  ${({ loginButton }) =>
    loginButton &&
    css`
      margin-top: 125px;
    `}
`;

const Button = ({ children, loading, loginButton }) => (
  <StyledWrapper loginButton={loginButton ? 'loginButton' : null}>
    {loading || children}
  </StyledWrapper>
);

export default Button;
