import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
  max-width: 60vw;
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;
  animation: appear 0.7s ease;

  thead tr {
    background-color: ${({ theme }) => theme.main};
    text-align: left;
    color: #fff;
    width: 100%;
    font-weight: bold;
  }

  th,
  td:not(:last-child) {
    padding: 12px 20px;
    text-align: left;
  }
  th:last-child {
    text-align: center;
    margin: 0;
    padding: 0;
  }
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.input};
  }

  tbody tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.input};
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.main};
  }
`;

const Table = () => (
  <StyledTable>
    <thead>
      <tr>
        <th>Polish</th>
        <th>English</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>polish</td>
        <td>english</td>
        <td>Actions</td>
      </tr>
      <tr>
        <td>polish</td>
        <td>english</td>
        <td>Actions</td>
      </tr>
    </tbody>
  </StyledTable>
);

export default Table;
