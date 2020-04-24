import React from 'react';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Table from 'components/molecules/Table/Table';
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

const TableTemplate = () => (
  <UserPageTemplate>
    <StyledWrapper>
      <Title>Table</Title>
      <StyledInput search placeholder="Search" />
      <Table />
    </StyledWrapper>
  </UserPageTemplate>
);

export default TableTemplate;
