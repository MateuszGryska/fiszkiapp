import styled from 'styled-components';

const DarkerBackground = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 997;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export default DarkerBackground;
