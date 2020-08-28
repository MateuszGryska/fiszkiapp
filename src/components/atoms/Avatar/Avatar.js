import styled from 'styled-components';
import userIcon from 'assets/icons/user.svg';

const Avatar = styled.div`
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  justify-self: flex-start;
  background-image: url(${({ image }) => image || userIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 100%;
`;

export default Avatar;
