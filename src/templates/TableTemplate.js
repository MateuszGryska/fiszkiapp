import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

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

const TableTemplate = ({ children }) => (
  <UserPageTemplate>
    <StyledWrapper>
      <Title>Words list</Title>
      <StyledInput search placeholder="Search" />
      <StyledTable>
        <thead>
          <tr>
            <th>Polish</th>
            <th>English</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </StyledTable>
    </StyledWrapper>
  </UserPageTemplate>
);

TableTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableTemplate;
