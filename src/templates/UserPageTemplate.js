import React from 'react';
import styled from 'styled-components';
import Navbar from 'components/atoms/Navbar/Navbar';
import PropTypes from 'prop-types';
import Menubar from 'components/organisms/Menubar/Menubar';

const StyledWrapper = styled.div`
  padding-top: 70px;
`;
const UserPageTemplate = ({ children }) => (
  <StyledWrapper>
    <Navbar />
    <Menubar />
    {children}
  </StyledWrapper>
);

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
