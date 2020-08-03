import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:focus {
    outline: 0;
  }

  height: 32px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid ${({ theme }) => theme.input};
  background: ${({ theme }) => theme.white};
  transition: all 0.2s ease;
  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }

  &:checked {
    border-color: ${({ theme }) => theme.main};
    &:after {
      transform: translatex(20px);
      background: ${({ theme }) => theme.main};
    }
  }
`;
const Toggle = ({ isChecked, setCheckbox }) => {
  return <StyledWrapper type="checkbox" checked={isChecked} onClick={setCheckbox} />;
};

Toggle.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  setCheckbox: PropTypes.func.isRequired,
};

export default Toggle;
