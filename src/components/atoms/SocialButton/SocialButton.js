import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import googleLogo from 'assets/icons/google-logo.svg';
import facebookLogo from 'assets/icons/facebook-logo.svg';
import twitterLogo from 'assets/icons/twitter-logo.svg';

const StyledWrapper = styled.button`
    position: relative;
    width: 270px;
    border-radius: 5px;
    border: none;
    color: ${({ theme }) => theme.white};
    font-size: ${({ theme }) => theme.fontSize.s};
    text-align: left;
    cursor: pointer;
    padding-left: 80px;
    margin-top: 10px;
    font-weight: bold;

  ${({ facebook }) =>
    facebook &&
    css`
      background: #4267b2;
      margin-top: 0;
    `}
    ${({ google }) =>
      google &&
      css`
        background: #4285f4;
      `}
    ${({ twitter }) =>
      twitter &&
      css`
        background: #1da1f2;
      `}
`;

const StyledIcon = styled.a`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 1px;
  top: 1px;


  ${({ facebook }) =>
    facebook &&
    css`
      background: url(${facebookLogo});
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% 100%;
    `}
    ${({ google }) =>
      google &&
      css`
        background: url(${googleLogo});
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-color: #ffffff;
        border-radius: 5px;
      `}
    ${({ twitter }) =>
      twitter &&
      css`
        background: url(${twitterLogo});
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 100% 100%;
      `}
`;

const SocialButton = ({ children, loading, facebook, google, twitter, ...rest }) => (
  <StyledWrapper
    facebook={facebook ? 'facebook' : null}
    google={google ? 'google' : null}
    twitter={twitter ? 'twitter' : null}
    {...rest}
  >
    <StyledIcon
      facebook={facebook ? 'facebook' : null}
      google={google ? 'google' : null}
      twitter={twitter ? 'twitter' : null}
    />
    <p>{loading || children}</p>
  </StyledWrapper>
);

SocialButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  facebook: PropTypes.bool,
  google: PropTypes.bool,
  twitter: PropTypes.bool,
};

SocialButton.defaultProps = {
  facebook: null,
  google: null,
  twitter: null,
  loading: null,
};

export default SocialButton;
