import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ShowButton = styled(Link)`
  padding-top: 20px;
  margin-top: 20px;
  color: ${({ theme }) => theme.showButton};
  text-decoration: none;
  font-style: italic;
  font-weight: ${({ theme }) => theme.light};
  font-size: ${({ theme }) => theme.fontSize.s};
  background: none;
  border: none;

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default ShowButton;
