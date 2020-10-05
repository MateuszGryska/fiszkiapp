import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/icons/magnifier.svg';

const Input = styled.input<{ search: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  background-color: ${({ theme }) => theme.input};
  padding: 10px 20px 10px 20px;
  width: 400px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.inputHover};
  font-size: ${({ theme }) => theme.fontSize.s};
  outline: none;
  transition: all 0.5s ease-out;
  color: ${({ theme }) => theme.fontColor};

  ::placeholder {
    text-transform: capitalize;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.fontColor};
  }

  :focus {
    background-color: ${({ theme }) => theme.inputHover};
    transition: all 0.5s ease-out;
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
