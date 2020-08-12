import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import { NavLink } from 'react-router-dom';
import AccountDetails from 'components/molecules/AccountDetails/AccountDetails';
import { signOut as signOutAction } from 'actions';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 8px solid ${({ theme }) => theme.main};
  box-shadow: ${({ isVisible }) =>
    isVisible ? '-10px 3px 20px 0px rgba(0, 0, 0, 0.16);' : 'none'};
  padding: 20px 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledLinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

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

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const Menubar = React.memo(
  ({ isVisible, handleClose, profileData, signOut }) => (
    <>
      <StyledWrapper isVisible={isVisible}>
        <AccountDetails profileData={profileData} signOut={signOut} />
        <ReturnButton onClick={() => handleClose()} />

        <StyledLinkList>
          <li>
            <StyledNavLink exact to="/flashcards" activeclass="active">
              flashcards
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/quiz" activeclass="active">
              quiz
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/spelling" activeclass="active">
              spelling check
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/words" activeclass="active">
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
      <DarkerBackground isVisible={isVisible} onClick={() => handleClose()} />
    </>
  ),
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

Menubar.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  profileData: PropTypes.shape({}).isRequired,
  signOut: PropTypes.func.isRequired,
};

Menubar.defaultProps = {
  isVisible: false,
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAction()),
});

export default connect(null, mapDispatchToProps)(Menubar);
