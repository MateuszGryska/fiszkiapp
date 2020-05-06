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
    box-shadow: 0px 15px 20px ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.white};
    transform: translateY(-7px);
  }

  ${({ loginButton }) =>
    loginButton &&
    css`
      margin-top: 125px;
    `}

    ${({ deleteButton }) =>
      deleteButton &&
      css`
        &:hover {
          background: ${({ theme }) => theme.red};
          box-shadow: 0px 15px 20px rgb(255, 51, 51);
        }
      `}
  ${({ recoverButton }) =>
    recoverButton &&
    css`
      margin-top: 160px;
    `}
`;

const Button = ({ children, loading, loginButton, recoverButton, deleteButton, ...rest }) => (
  <StyledWrapper
    loginButton={loginButton ? 'loginButton' : null}
    recoverButton={recoverButton ? 'recoverButton' : null}
    deleteButton={deleteButton ? 'deleteButton' : null}
    {...rest}
  >
    {loading || children}
  </StyledWrapper>
);

export default Button;
