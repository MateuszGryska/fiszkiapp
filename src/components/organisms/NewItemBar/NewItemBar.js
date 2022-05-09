import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import InputSection from 'components/molecules/InputSection/InputSection';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { addItem as addItemAction } from 'actions';
import { wordSchema, noteSchema } from 'validation';
import { useTranslation } from 'react-i18next';
import { COLLECTION_TYPES, PAGE_TYPES } from 'helpers/constants';

const StyledWrapper = styled.aside`
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
  z-index: 1000;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;
  color: ${({ theme }) => theme.fontColor};

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;

const NewItemBar = React.memo(
  ({ handleClose, isVisible, pageContext, addItem }) => {
    const { t } = useTranslation();

    return (
      <>
        <StyledWrapper isVisible={isVisible}>
          <ReturnButton onClick={() => handleClose()} />
          <BarsTitle>
            {t('bars_title.add')}{' '}
            {pageContext === PAGE_TYPES.notes ? t('bars_title.note') : t('bars_title.word')}
          </BarsTitle>
          {pageContext === PAGE_TYPES.notes ? (
            <StyledParagraph>{t('description.add_or_edit_note')}</StyledParagraph>
          ) : (
            <StyledParagraph>{t('description.add_or_edit_word')}</StyledParagraph>
          )}
          <Formik
            validationSchema={() => {
              if (pageContext === PAGE_TYPES.notes) {
                return noteSchema;
              }
              return wordSchema;
            }}
            initialValues={{ title: '', content: '', polish: '', english: '', description: '' }}
            onSubmit={(values, { resetForm }) => {
              if (pageContext === PAGE_TYPES.notes) {
                addItem(pageContext, values);
              } else {
                addItem(COLLECTION_TYPES.words, values);
              }
              resetForm();
            }}
          >
            {({ values, handleChange, handleBlur, isValid, errors, touched }) => (
              <StyledForm>
                {pageContext === PAGE_TYPES.notes ? (
                  <StyledFieldset>
                    <InputSection
                      type="text"
                      name="title"
                      placeholder="input.title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      label="input.title"
                      error={errors.title}
                      touched={touched.title}
                      ariaDescribedBy="title_error"
                      dataCy="new-note-title"
                    />
                    <InputSection
                      type="text"
                      name="content"
                      dataCy="content"
                      as="textarea"
                      placeholder="input.content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      label="input.content"
                      error={errors.content}
                      touched={touched.content}
                      ariaDescribedBy="content_error"
                    />
                  </StyledFieldset>
                ) : (
                  <StyledFieldset>
                    <InputSection
                      type="text"
                      name="polish"
                      placeholder="input.polish"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.polish}
                      label="input.polish"
                      error={errors.polish}
                      touched={touched.polish}
                      ariaDescribedBy="polish_error"
                    />
                    <InputSection
                      type="text"
                      name="english"
                      placeholder="input.english"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.english}
                      label="input.english"
                      error={errors.english}
                      touched={touched.english}
                      ariaDescribedBy="english_error"
                    />
                    <InputSection
                      dataCy="add-description"
                      type="text"
                      name="description"
                      as="textarea"
                      placeholder="input.description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      label="input.description"
                      error={errors.description}
                      touched={touched.description}
                      ariaDescribedBy="description_error"
                    />
                  </StyledFieldset>
                )}

                <StyledActionButton
                  secondary
                  disabled={!isValid}
                  type="submit"
                  onClick={() => handleClose()}
                >
                  {t('buttons.add')}
                </StyledActionButton>
                <StyledActionButton secondary disabled={!isValid} type="submit">
                  {t('buttons.add_and_next')}
                </StyledActionButton>
              </StyledForm>
            )}
          </Formik>
        </StyledWrapper>
        <DarkerBackground isVisible={isVisible} onClick={() => handleClose()} />
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

NewItemBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  pageContext: PropTypes.oneOf([
    'notes',
    'words',
    'flashcards',
    'login',
    'register',
    'account',
    'reset-password',
    'quiz',
    'spelling',
    'about',
  ]),
};

NewItemBar.defaultProps = {
  pageContext: PAGE_TYPES.flashcards,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, data) => dispatch(addItemAction(itemType, data)),
});

export default withContext(connect(null, mapDispatchToProps)(NewItemBar));
