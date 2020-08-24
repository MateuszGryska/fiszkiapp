import React from 'react';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import Message from 'components/atoms/Message/Message';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { MessageSchema } from 'validation';
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
`;

const StyledSpan = styled.span`
  display: inline-block;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-top: 10px;
  width: 370px;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledTextArea = styled(Input)`
  margin-top: 10px;
  height: 30vh;
  min-height: 10vh;
  min-width: 370px;
  max-width: 370px;

  @media (max-width: 480px) {
    min-width: 200px;
    width: 90vw;
  }
`;

const StyledMessage = styled(Message)`
  margin-top: 0px;
  margin-bottom: 20px;
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

        <Formik
          validationSchema={MessageSchema}
          initialValues={{ name: '', message: '' }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {({ values, handleChange, handleBlur, isValid, errors, touched }) => (
            <StyledForm>
              <StyledInput
                autoComplete="off"
                type="text"
                name="name"
                placeholder={t('input.name')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <StyledMessage error>{t(errors.name)}</StyledMessage>
              ) : (
                <StyledMessage />
              )}

              <StyledTextArea
                autoComplete="off"
                as="textarea"
                type="text"
                name="message"
                placeholder={t('input.message')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              {errors.message && touched.message ? (
                <StyledMessage error>{t(errors.message)}</StyledMessage>
              ) : (
                <StyledMessage />
              )}
              <ActionButton secondary type="submit" disabled={!isValid}>
                Send
              </ActionButton>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default AboutTemplate;
