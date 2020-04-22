import styled from 'styled-components';

const ShowButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.showButton};
  font-weight: 500;
  font-style: italic;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default ShowButton;
