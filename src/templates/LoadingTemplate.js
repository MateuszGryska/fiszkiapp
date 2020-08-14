import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background: rgb(104, 163, 86);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.8rem;
  color: white;

  @keyframes ldio-yrsk4zqf64p {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .ldio-yrsk4zqf64p div {
    position: absolute;
    animation: ldio-yrsk4zqf64p 0.9600000000000001s linear infinite;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    box-shadow: 0 4px 0 0 #ffffff;
    transform-origin: 80px 82px;
  }
  .loadingio-spinner-eclipse-bed633htexc {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-yrsk4zqf64p {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-yrsk4zqf64p div {
    box-sizing: content-box;
  }
`;

const LoadingTemplate = () => (
  <StyledWrapper>
    <div className="loadingio-spinner-eclipse-bed633htexc">
      <div className="ldio-yrsk4zqf64p">
        <div />
      </div>
    </div>
  </StyledWrapper>
);

export default LoadingTemplate;
