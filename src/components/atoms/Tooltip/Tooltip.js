import styled from 'styled-components';
import infoIcon from 'assets/icons/info.svg';

const Tooltip = styled.div`
  position: relative;
  background-image: url(${infoIcon});
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-size: 100% 70%;
  background-color: transparent;
  

  text-decoration: none;
  width: 35px;
  height: 35px;
  &:before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    padding: 0.5em 1em;
    min-width: 100px; 
    text-align: center;
    content: '${({ description }) => description || 'No description'}';
    color: ${({ theme }) => theme.fontColor};
    font-size: 0.8em;
    line-height: 1.7em;
    background-color: ${({ theme }) => theme.background};
    opacity: 0;
    transform: translate(-50%, 0);
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-out;
    pointer-events: none;
  }
  &:after {
    position: absolute;
    z-index: 200;
    display: block;
    bottom: 100%;
    left: 50%;
    width: 10px;
    height: 10px;
    margin-bottom: -4px;
    content: '';
    background-color: ${({ theme }) => theme.background};
    opacity: 0;
    transform: translate(-50%, 0) rotate(45deg);
    transition: transform 0.2s ease-out;
    pointer-events: none;
  }

  &:hover,
  &:focus {
    &:before {
      opacity: 1;
      transform: translate(-50%, -10px);
    }
    &:after {
      opacity: 1;
      transform: translate(-50%, -10px) rotate(45deg);
    }
  }

`;

export default Tooltip;
