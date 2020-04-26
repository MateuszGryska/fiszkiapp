import React from 'react';
import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';
import Input from 'components/atoms/Input/Input';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 2px ${({ theme }) => theme.main};
  box-shadow: -10px 3px 20px 0px rgba(0, 0, 0, 0.16);
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

const NewItemBar = ({ handleClose, isVisible, pageContext }) => (
  <StyledWrapper isVisible={isVisible}>
    <StyledButton onClick={() => handleClose()} />
    <StyledTitle>Add new {pageContext === 'notes' ? 'note' : 'word'}</StyledTitle>
    <Formik
      initialValues={{ title: '', content: '' }}
      onSubmit={(values) => {
        console.log(values);
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

          {pageContext === 'words' ? (
            <>
              <StyledInput
                type="text"
                name="polish"
                placeholder="polish"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledInput
                type="text"
                name="english"
                placeholder="english"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
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
);

export default withContext(NewItemBar);
