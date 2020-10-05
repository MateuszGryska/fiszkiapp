import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type GreyType = boolean;

const StyledWrapper = styled.div<{ grey: GreyType }>`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ grey }) => (grey ? '#e3e3e3' : '#fff')};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ grey }) => (grey ? '#e3e3e3' : '#fff')} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ grey }: { grey: GreyType }) => (
  <StyledWrapper grey={grey}>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </StyledWrapper>
);

LoadingSpinner.propTypes = {
  grey: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  grey: false,
};

export default LoadingSpinner;
