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
import { updateItem as editItemAction } from 'actions';
import { wordSchema, noteSchema } from 'validation';

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
    created,
    description,
  }) => (
    <>
      <StyledWrapper isVisible={isVisible}>
        <ReturnButton onClick={() => handleClose(false)} />
        <BarsTitle>Edit {pageContext === 'notes' ? 'note' : 'word'}</BarsTitle>
        {pageContext === 'flashcards' || pageContext === 'words' ? (
          <StyledParagraph>
            The word can have a maximum of 25 letters and be without special characters.
          </StyledParagraph>
        ) : null}
        {pageContext === 'notes' ? (
          <StyledParagraph>
            The title can have a maximum of 25 letters and content can have a maximum of 300
            letters.
          </StyledParagraph>
        ) : null}

        <Formik
          validationSchema={() => {
            if (pageContext === 'words' || pageContext === 'flashcards') {
              return wordSchema;
            }
            if (pageContext === 'notes') {
              return noteSchema;
            }
            return null;
          }}
          initialValues={{ title, content, polish, english, created, description }}
          onSubmit={async (values) => {
            if (pageContext === 'flashcards') {
              await updateItem('words', id, values);
              handleClose(false);
            } else {
              await updateItem(pageContext, id, values);
              handleClose(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, isValid, errors, touched }) => (
            <StyledForm>
              {pageContext === 'notes' ? (
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
              ) : null}

              {pageContext === 'words' || pageContext === 'flashcards' ? (
                <>
                  <div>
                    <StyledInput
                      autoComplete="off"
                      type="text"
                      name="polish"
                      placeholder="polish"
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
                      placeholder="english"
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
              ) : null}
              <StyledActionButton secondary disabled={!isValid} type="submit">
                update
              </StyledActionButton>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
      <DarkerBackground isVisible={isVisible} onClick={() => handleClose(false)} />
    </>
  ),
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

EditItemBar.propTypes = {
  polish: PropTypes.string,
  english: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  created: PropTypes.string,
  isVisible: PropTypes.bool,
  pageContext: PropTypes.oneOf([
    'notes',
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
  pageContext: 'words',
  isVisible: false,
  polish: '',
  english: '',
  title: '',
  content: '',
  created: '',
};

const mapDispatchToProps = (dispatch) => ({
  updateItem: (itemType, id, itemContent) => dispatch(editItemAction(itemType, id, itemContent)),
});

export default withContext(connect(null, mapDispatchToProps)(EditItemBar));
