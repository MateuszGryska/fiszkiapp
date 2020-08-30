import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import InputSection from 'components/molecules/InputSection/InputSection';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { updateItem as editItemAction } from 'actions';
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

const StyledFieldset = styled.fieldset`
  border: none;
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

const EditItemBar = React.memo(
  ({
    handleClose,
    isVisible,
    pageContext,
    updateItem,
    polish,
    english,
    title,
    content,
    id,
    description,
  }) => {
    const { t } = useTranslation();

    return (
      <>
        <StyledWrapper isVisible={isVisible}>
          <ReturnButton onClick={() => handleClose(false)} />
          <BarsTitle>
            {t('bars_title.edit')}{' '}
            {pageContext === PAGE_TYPES.notes ? t('bars_title.note') : t('bars_title.word')}
          </BarsTitle>
          {pageContext === PAGE_TYPES.notes ? (
            <StyledParagraph>{t('description.add_or_edit_note')}</StyledParagraph>
          ) : (
            <StyledParagraph>{t('description.add_or_edit_word')}</StyledParagraph>
          )}

          <Formik
            validationSchema={() => {
              if (pageContext === PAGE_TYPES.words || pageContext === PAGE_TYPES.flashcards) {
                return wordSchema;
              }
              if (pageContext === PAGE_TYPES.notes) {
                return noteSchema;
              }
              return null;
            }}
            initialValues={{ title, content, polish, english, description }}
            onSubmit={async (values) => {
              if (pageContext === PAGE_TYPES.flashcards) {
                await updateItem(COLLECTION_TYPES.words, id, values);
                handleClose(false);
              } else {
                await updateItem(pageContext, id, values);
                handleClose(false);
              }
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
                    />
                    <InputSection
                      type="text"
                      name="content"
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
                ) : null}

                {pageContext === PAGE_TYPES.words || pageContext === PAGE_TYPES.flashcards ? (
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
                ) : null}
                <StyledActionButton secondary disabled={!isValid} type="submit">
                  {t('buttons.update')}
                </StyledActionButton>
              </StyledForm>
            )}
          </Formik>
        </StyledWrapper>
        <DarkerBackground isVisible={isVisible} onClick={() => handleClose(false)} />
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

EditItemBar.propTypes = {
  polish: PropTypes.string,
  english: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  pageContext: PropTypes.oneOf([
    'notes',
    'quiz',
    'spelling',
    'words',
    'flashcards',
    'login',
    'register',
    'account',
    'reset-password',
  ]),
  handleClose: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

EditItemBar.defaultProps = {
  pageContext: PAGE_TYPES.words,
  isVisible: false,
  polish: '',
  english: '',
  title: '',
  content: '',
  description: '',
};

const mapDispatchToProps = (dispatch) => ({
  updateItem: (itemType, id, itemContent) => dispatch(editItemAction(itemType, id, itemContent)),
});

export default withContext(connect(null, mapDispatchToProps)(EditItemBar));
