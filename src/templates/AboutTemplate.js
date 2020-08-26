import React from 'react';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import { useTranslation } from 'react-i18next';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 150px 25px 150px;
  color: ${({ theme }) => theme.fontColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledParagraph = styled.p`
  width: 500px;
  text-align: center;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledSpan = styled.span`
  display: inline-block;
  margin-bottom: 20px;
`;

const StyledFooter = styled.footer`
  margin-top: 20px;
  text-align: center;
  font-size: 0.8em;
`;

const AboutTemplate = () => {
  const { t } = useTranslation();

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>{t('title.about')}</Title>
        <StyledParagraph>
          <StyledSpan>{t('about_section.header')}</StyledSpan>
          <StyledSpan>{t('about_section.description')}</StyledSpan>
          <StyledSpan>{t('about_section.flashcards')}</StyledSpan>
          <StyledSpan>{t('about_section.quiz')}</StyledSpan>
          <StyledSpan>{t('about_section.spelling_check')}</StyledSpan>
          <StyledSpan>{t('about_section.database')}</StyledSpan>
          <StyledSpan>{t('about_section.footer')}</StyledSpan>
          <StyledSpan>{t('about_section.send_email')}</StyledSpan>
        </StyledParagraph>
        <StyledFooter>
          <div>
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols">
              Prosymbols
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
          <div>
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
          <span>Icons made by i8 icons</span>
        </StyledFooter>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default AboutTemplate;
