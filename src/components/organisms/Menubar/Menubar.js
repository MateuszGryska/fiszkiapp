import React from 'react';
import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';
import { NavLink } from 'react-router-dom';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: -10px 3px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 10px;
  left: 15px;
  border: none;
  width: 20px;
  height: 30px;
  background-image: url(${backArrow});
  background-size: 20px;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const StyledLinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    margin-top: 20px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.main};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.main};
  }
`;

const Menubar = () => (
  <StyledWrapper>
    <StyledButton />
    <StyledLinkList>
      <li>
        <StyledNavLink exact to="/" activeclass="active">
          flashcards
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/table" activeclass="active">
          words list
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/notes" activeclass="active">
          notes
        </StyledNavLink>
      </li>
    </StyledLinkList>
  </StyledWrapper>
);

export default Menubar;
