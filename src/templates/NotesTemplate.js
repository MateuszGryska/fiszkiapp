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

const StyledGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;

  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

const NotesTemplate = ({ children }) => (
  <UserPageTemplate>
    <StyledWrapper>
      <Title>Notes</Title>
      <StyledInput search placeholder="Search" />
      <StyledGrid>{children}</StyledGrid>
    </StyledWrapper>
  </UserPageTemplate>
);

NotesTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotesTemplate;
