import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.button`
  min-height: 50px;
  width: 270px;
  border-radius: 10px;
  border: none;
  margin-top: 30px;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.s};
  letter-spacing: 1.5px;
  transition: all 0.3s ease 0s;
  cursor: pointer;

  @media (max-width: 480px) {
    outline: none;
  }

  &:hover {
    box-shadow: 0px 15px 20px ${({ theme }) => theme.hover};
    transform: translateY(-7px);
  }

  &:disabled {
    background: ${({ theme }) => theme.greyButton};
    transition: none;
    cursor: not-allowed;
    color: ${({ theme }) => theme.fontColor};
    &:hover {
      background: ${({ theme }) => theme.greyButton};
      box-shadow: none;
      transform: translateY(0px);
    }
  }

  ${({ deleteButton }) =>
    deleteButton &&
    css`
      background: ${({ theme }) => theme.red};
    `}
  ${({ recoverButton }) =>
    recoverButton &&
    css`
      margin-top: 95px;
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
