import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import Message from 'components/atoms/Message/Message';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { addItem as addItemAction } from 'actions';
import { wordSchema, noteSchema } from 'validation';
import { COLLECTION_TYPES, PAGE_TYPES } from 'helpers/constants';

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
  z-index: 1000;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;

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

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

const StyledMessage = styled(Message)`
  margin-top: 0px;
  padding-left: 20px;
  margin-bottom: 5px;
`;

const NewItemBar = React.memo(
  ({ handleClose, isVisible, pageContext, addItem }) => (
    <>
      <StyledWrapper isVisible={isVisible}>
        <ReturnButton onClick={() => handleClose()} />
        <BarsTitle>Add new {pageContext === PAGE_TYPES.notes ? 'note' : 'word'}</BarsTitle>

        {pageContext === PAGE_TYPES.notes ? (
          <StyledParagraph>
            The title can have a maximum of 25 letters and content can have a maximum of 300
            letters.
          </StyledParagraph>
        ) : (
          <StyledParagraph>
            The word can have a maximum of 25 letters and be without special characters.
          </StyledParagraph>
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
                <>
                  <div>
                    <StyledInput
                      autoComplete="off"
                      type="text"
                      name="title"
                      placeholder="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                    {errors.title && touched.title ? (
                      <StyledMessage error>{errors.title}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </div>
                  <div>
                    <StyledTextArea
                      autoComplete="off"
                      as="textarea"
                      type="text"
                      name="content"
                      placeholder="content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                    />
                    {errors.content && touched.content ? (
                      <StyledMessage error>{errors.content}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <StyledInput
                      autoComplete="off"
                      type="text"
                      name="polish"
                      placeholder="polish*"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.polish}
                    />
                    {errors.polish && touched.polish ? (
                      <StyledMessage error>{errors.polish}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      autoComplete="off"
                      type="text"
                      name="english"
                      placeholder="english*"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.english}
                    />
                    {errors.english && touched.english ? (
                      <StyledMessage error>{errors.english}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </div>
                  <div>
                    <StyledTextArea
                      autoComplete="off"
                      as="textarea"
                      type="text"
                      name="description"
                      placeholder="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description && touched.description ? (
                      <StyledMessage error>{errors.description}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </div>
                </>
              )}

              <StyledActionButton
                secondary
                disabled={!isValid}
                type="submit"
                onClick={() => handleClose()}
              >
                add
              </StyledActionButton>
              <StyledActionButton secondary disabled={!isValid} type="submit">
                add & next
              </StyledActionButton>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
      <DarkerBackground isVisible={isVisible} onClick={() => handleClose()} />
    </>
  ),
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
  ]),
};

NewItemBar.defaultProps = {
  pageContext: PAGE_TYPES.flashcards,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, data) => dispatch(addItemAction(itemType, data)),
});

export default withContext(connect(null, mapDispatchToProps)(NewItemBar));
