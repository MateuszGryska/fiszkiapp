import styled, { css } from 'styled-components';

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  text-decoration: none;
  color: black;
  border: none;
  font-size: 1.3rem;
  background: ${({ theme }) => theme.greyButton};
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 10px;
  cursor: pointer;

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme }) => theme.main};
      color: ${({ theme }) => theme.white};
    `}
`;

export default ActionButton;
