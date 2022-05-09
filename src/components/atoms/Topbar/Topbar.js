import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import menuIcon from 'assets/icons/menu.svg';
import logo from 'assets/icons/logo.svg';

const StyledWrapper = styled.header`
  height: 80px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.16);
  z-index: 99;
`;

const StyledLogo = styled(Link)`
  width: 150px;
  height: 45px;
  background-image: url(${logo});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
`;
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledMenu = styled.button`
  display: block;
  width: 47px;
  height: 47px;
  background-image: url(${menuIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 70%;
  border: none;
  cursor: pointer;
`;

const StyledVerifiedInfo = styled.details`
  position: fixed;
  top: 80px;
  left: 0;
  height: 30px;
  width: 100vw;
  background: red;
  color: white;
  margin: 0;
  padding: 0px;
  display: ${({ emailVerified }) => (emailVerified ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
`;

const Topbar = ({ handleOpen, emailVerified }) => (
  <>
    <StyledWrapper>
      <StyledNav>
        <StyledLogo rel="index" to="/" />
        <StyledMenu data-cy="hamburger-menu" onClick={() => handleOpen()} />
      </StyledNav>
    </StyledWrapper>
    <StyledVerifiedInfo emailVerified={emailVerified}>
      Your account is not verified! Check your email!
    </StyledVerifiedInfo>
  </>
);

Topbar.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  emailVerified: PropTypes.bool.isRequired,
};
export default Topbar;
