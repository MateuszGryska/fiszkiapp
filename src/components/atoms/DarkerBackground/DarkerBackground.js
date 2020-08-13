import styled from 'styled-components';

const DarkerBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 997;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export default DarkerBackground;
