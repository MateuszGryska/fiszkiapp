import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import { routes } from 'routes';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.fontColor};
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: -10px 3px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  z-index: 1000;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
  margin: 0;
`;

const DataInfo = styled.p`
  font-size: 1rem;
  margin-top: 10px;
`;
const StyledContent = styled.p`
  font-weight: ${({ theme }) => theme.light};
  margin-bottom: 50px;
`;
const DetailsTemplate = ({ title, content, created, loading, isVisible }) => (
  <UserPageTemplate>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <>
        <StyledWrapper isVisible={isVisible}>
          <StyledTitle>{title}</StyledTitle>
          <DataInfo>{created}</DataInfo>
          <StyledContent>{content}</StyledContent>
          <ActionButton as={Link} to={routes.notes}>
            Close
          </ActionButton>
        </StyledWrapper>
      </>
    )}
  </UserPageTemplate>
);

DetailsTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created: PropTypes.string,
  isVisible: PropTypes.bool,
  loading: PropTypes.bool,
};

DetailsTemplate.defaultProps = {
  created: 'Problems with created date',
  isVisible: false,
  loading: false,
};

export default DetailsTemplate;
