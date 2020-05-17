import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { addItem as addItemAction } from 'actions';

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
  width: 370px;
  height: 30vh;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const wordSchema = Yup.object().shape({
  polish: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .matches(/^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-z])*$/g)
    .required('The polish word is required.'),
  english: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .matches(/^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-z])*$/g)
    .required('The english word is required.'),
});

const noteSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too short.').max(25, 'Too long.').required('The title is required.'),
  content: Yup.string()
    .min(2, 'Too short.')
    .max(300, 'Too long.')
    .required('The content is required.'),
});

const NewItemBar = React.memo(
  ({ handleClose, isVisible, pageContext, addItem }) => (
    <>
      <StyledWrapper isVisible={isVisible}>
        <ReturnButton onClick={() => handleClose()} />
        <BarsTitle>Add new {pageContext === 'notes' ? 'note' : 'word'}</BarsTitle>
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
          initialValues={{ title: '', content: '', polish: '', english: '' }}
          onSubmit={(values, { resetForm }) => {
            if (pageContext === 'flashcards') {
              addItem('words', values);
            } else {
              addItem(pageContext, values);
            }
            resetForm();
            handleClose();
          }}
        >
          {({ values, handleChange, handleBlur, isValid }) => (
            <StyledForm>
              {pageContext === 'notes' ? (
                <>
                  <StyledInput
                    autoComplete="off"
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
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
                </>
              ) : null}

              {pageContext === 'words' || pageContext === 'flashcards' ? (
                <>
                  <StyledInput
                    autoComplete="off"
                    type="text"
                    name="polish"
                    placeholder="polish"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.polish}
                  />
                  <StyledInput
                    autoComplete="off"
                    type="text"
                    name="english"
                    placeholder="english"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.english}
                  />
                </>
              ) : null}
              <StyledActionButton secondary disabled={!isValid} type="submit">
                add
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
  ]),
};

NewItemBar.defaultProps = {
  pageContext: 'flashcards',
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, data) => dispatch(addItemAction(itemType, data)),
});

export default withContext(connect(null, mapDispatchToProps)(NewItemBar));
