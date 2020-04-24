import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  background-color: ${({ theme }) => theme.input};
  padding: 10px 20px 10px 40px;
  width: 400px;
  border-radius: 20px;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  outline: none;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.fontGrey};
  }

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      background-image: url(${magnifierIcon});
      font-size: ${({ theme }) => theme.fontSize.s};
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;
