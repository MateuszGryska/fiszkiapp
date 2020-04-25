import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import menuIcon from 'assets/icons/menu.svg';
import logo from 'assets/icons/logo.svg';

const StyledWrapper = styled.div`
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

const Navbar = ({ handleOpen }) => (
  <StyledWrapper>
    <StyledNav>
      <img src={logo} alt="logo" />
      <StyledMenu onClick={() => handleOpen()} />
    </StyledNav>
  </StyledWrapper>
);

Navbar.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};
export default Navbar;
