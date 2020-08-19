import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import userIcon from 'assets/icons/user.svg';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.section`
  width: 320px;
  height: 150px;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 50px;

  @media (max-width: 480px) {
    left: 10px;
    width: 360px;
  }
`;

const StyledAccountsDetails = styled.article`
  margin-left: 20px;
`;

const StyledUserIcon = styled.aside`
  width: 100px;
  height: 100px;
  justify-self: flex-start;
  background-image: url(${userIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 100%;
`;

const StyledTitle = styled.aside`
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.fontColor};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledHello = styled.p`
  display: inline;
  color: ${({ theme }) => theme.main};
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};
  border: none;
  background: none;
  padding: 0;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.s};
  cursor: pointer;
  outline: none;

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
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const StyledButtons = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AccountDetails = ({ profileData, signOut }) => (
  <StyledWrapper>
    <StyledUserIcon />
    <StyledAccountsDetails>
      <StyledTitle>
        <StyledHello>Hello</StyledHello> {profileData.firstName}!
      </StyledTitle>
      <StyledButtons>
        <StyledButton to="/account">My account</StyledButton>
        <StyledButton to="/" onClick={() => signOut()}>
          Log Out
        </StyledButton>
      </StyledButtons>
    </StyledAccountsDetails>
  </StyledWrapper>
);

AccountDetails.propTypes = {
  profileData: PropTypes.shape({ firstName: PropTypes.string }),
  signOut: PropTypes.func.isRequired,
};
AccountDetails.defaultProps = {
  profileData: { firstName: '' },
};

export default AccountDetails;
