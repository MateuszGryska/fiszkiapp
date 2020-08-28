import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import { NavLink } from 'react-router-dom';
import AccountDetails from 'components/molecules/AccountDetails/AccountDetails';
import { signOut as signOutAction } from 'actions';
import { routes } from 'routes';
import polandIcon from 'assets/icons/poland.svg';
import ukIcon from 'assets/icons/uk.svg';
import { useTranslation } from 'react-i18next';

const StyledWrapper = styled.section`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background};
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
  text-transform: lowercase;

  li {
    margin-top: 20px;
    text-align: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};
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

const StyledIcon = styled.button`
  width: 50px;
  height: 40px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 100%;
`;

const StyledLang = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  padding-top: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
`;

const StyledParagraph = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 20px;
  padding-left: 20px;
`;

const Menubar = React.memo(
  ({ isVisible, handleClose, profileData, signOut }) => {
    const { t, i18n } = useTranslation();

    const handleChangeLangClick = (lang) => {
      i18n.changeLanguage(lang);
    };

    return (
      <>
        <StyledWrapper isVisible={isVisible}>
          <StyledParagraph to={routes.about}>{t('title.about')}</StyledParagraph>
          <StyledLang>
            <StyledIcon icon={polandIcon} onClick={() => handleChangeLangClick('pl')} />
            |
            <StyledIcon icon={ukIcon} onClick={() => handleChangeLangClick('en')} />
          </StyledLang>
          <AccountDetails profileData={profileData} signOut={signOut} />
          <ReturnButton onClick={() => handleClose()} />
          <nav>
            <StyledLinkList>
              <li>
                <StyledNavLink exact to={routes.flashcards} activeclass="active">
                  {t('title.flashcards')}
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to={routes.quiz} activeclass="active">
                  {t('title.quiz')}
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to={routes.spelling} activeclass="active">
                  {t('title.spelling_check')}
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to={routes.words} activeclass="active">
                  {t('title.words_list')}
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to={routes.notes} activeclass="active">
                  {t('title.notes')}
                </StyledNavLink>
              </li>
            </StyledLinkList>
          </nav>
        </StyledWrapper>
        <DarkerBackground isVisible={isVisible} onClick={() => handleClose()} />
      </>
    );
  },
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
