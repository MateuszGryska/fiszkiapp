import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 700px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: -10px 3px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  z-index: 1000;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  cursor: default;
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
`;

const DataInfo = styled.p`
  font-size: 1rem;
  margin: 0;
`;
const StyledContent = styled.p`
  font-weight: ${({ theme }) => theme.light};
  margin-bottom: 50px;
`;
const DetailsTemplate = ({ title, content, created, isVisible }) => (
  <UserPageTemplate>
    <>
      <StyledWrapper isVisible={isVisible}>
        <StyledTitle>{title}</StyledTitle>
        <DataInfo>{created}</DataInfo>
        <StyledContent>{content}</StyledContent>
        <ActionButton as={Link} to="/notes">
          Close
        </ActionButton>
      </StyledWrapper>
      <StyledBackground as={Link} to="/notes" />
    </>
  </UserPageTemplate>
);

DetailsTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created: PropTypes.string,
  isVisible: PropTypes.bool,
};

DetailsTemplate.defaultProps = {
  created: 'tutaj mati musi dodać wyświetlanie daty',
  isVisible: false,
};

export default DetailsTemplate;
