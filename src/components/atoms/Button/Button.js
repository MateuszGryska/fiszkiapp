import React from 'react';
import PropTypes from 'prop-types';
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


  &:disabled {
    background: ${({ theme }) => theme.fontGrey};
        transition: none;
        cursor: not-allowed;
        color: black;
        &:hover {
          background: ${({ theme }) => theme.fontGrey};
          box-shadow: none;
          transform: translateY(0px);
        }
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

const Button = ({
  disabled,
  children,
  loading,
  loginButton,
  recoverButton,
  deleteButton,
  ...rest
}) => (
  <StyledWrapper
    disabled={disabled}
    loginButton={loginButton ? 'loginButton' : null}
    recoverButton={recoverButton ? 'recoverButton' : null}
    deleteButton={deleteButton ? 'deleteButton' : null}
    {...rest}
  >
    {loading || children}
  </StyledWrapper>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  loginButton: PropTypes.string,
  deleteButton: PropTypes.bool,
  recoverButton: PropTypes.string,
};

Button.defaultProps = {
  loginButton: null,
  deleteButton: null,
  recoverButton: null,
  loading: null,
  disabled: false,
};

export default Button;
