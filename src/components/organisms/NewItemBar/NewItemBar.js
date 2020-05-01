import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';
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
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: ${({ isVisible }) =>
    isVisible ? '-10px 3px 20px 0px rgba(0, 0, 0, 0.16);' : 'none'};
  padding: 20px 30px;
  z-index: 1000;

  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 15px;
  left: 30px;
  border: none;
  width: 20px;
  height: 30px;
  background-image: url(${backArrow});
  background-size: 20px;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
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
`;

const StyledTextArea = styled(Input)`
  margin-top: 10px;
  width: 370px;
  height: 30vh;
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const NewItemBar = ({ handleClose, isVisible, pageContext, addItem }) => (
  <>
    <StyledWrapper isVisible={isVisible}>
      <StyledButton onClick={() => handleClose()} />
      <StyledTitle>Add new {pageContext === 'notes' ? 'note' : 'word'}</StyledTitle>
      <Formik
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
        {({ values, handleChange, handleBlur }) => (
          <StyledForm>
            {pageContext === 'notes' ? (
              <>
                <StyledInput
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <StyledTextArea
                  as="textarea"
                  type="text"
                  name="content"
                  placeholder="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />{' '}
              </>
            ) : null}

            {pageContext === 'words' || pageContext === 'flashcards' ? (
              <>
                <StyledInput
                  type="text"
                  name="polish"
                  placeholder="polish"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.polish}
                />
                <StyledInput
                  type="text"
                  name="english"
                  placeholder="english"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.english}
                />{' '}
              </>
            ) : null}
            <StyledActionButton secondary type="submit">
              add
            </StyledActionButton>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
    <StyledBackground isVisible={isVisible} onClick={() => handleClose()} />
  </>
);

NewItemBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  pageContext: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, itemContent) => dispatch(addItemAction(itemType, itemContent)),
});

export default withContext(connect(null, mapDispatchToProps)(NewItemBar));
