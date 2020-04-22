import React from 'react';
import styled from 'styled-components';
import menuIcon from 'assets/icons/menu-icon.svg';
import logo from 'assets/icons/logo.svg';

const StyledWrapper = styled.div`
  height: 80px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.16);
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledMenu = styled.img`
  width: 57px;
`;

const Navbar = () => (
  <StyledWrapper>
    <StyledNav>
      <img src={logo} alt="logo" />
      <StyledMenu src={menuIcon} alt="menu" />
    </StyledNav>
  </StyledWrapper>
);

export default Navbar;
