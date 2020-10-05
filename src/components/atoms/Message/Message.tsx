import styled, { css } from 'styled-components';

const Message = styled.p<{ error: boolean }>`
  height: 10px;
  color: green;
  font-weight: ${({ theme }) => theme.light};
  font-size: 1.2rem;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

export default Message;
