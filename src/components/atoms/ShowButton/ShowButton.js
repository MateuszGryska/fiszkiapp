import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const ShowButton = styled(Link)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.showButton};
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  font-style: italic;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      padding-top: 20px;
      font-weight: ${({ theme }) => theme.light};
      margin-top: 20px;
      font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

export default ShowButton;
