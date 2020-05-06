import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';

const returnButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  border: none;
  width: 30px;
  height: 40px;
  background-color: transparent;
  background-image: url(${backArrow});
  background-size: 30px;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    filter: contrast(300%);
  }
`;

export default returnButton;
