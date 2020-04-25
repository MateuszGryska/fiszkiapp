import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;
`;

export default ButtonIcon;
