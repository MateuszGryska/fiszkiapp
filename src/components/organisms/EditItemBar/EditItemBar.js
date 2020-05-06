import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { updateItem as editItemAction } from 'actions';

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
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  border: none;
  width: 30px;
  height: 40px;
  background-color: transparent;
  background-image: url(${backArrow});
  background-size: 30px;
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

const EditItemBar = ({
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
}) => (
  <>
    <StyledWrapper isVisible={isVisible}>
      <StyledButton onClick={() => handleClose()} />
      <StyledTitle>Edit {pageContext === 'notes' ? 'note' : 'word'}</StyledTitle>
      <Formik
        initialValues={{ title, content, polish, english, created }}
        onSubmit={async (values) => {
          if (pageContext === 'flashcards') {
            await updateItem('words', id, values);
            handleClose();
          } else {
            await updateItem(pageContext, id, values);
            handleClose();
          }

          // handleClose();
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
              update
            </StyledActionButton>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
    <StyledBackground isVisible={isVisible} onClick={() => handleClose()} />
  </>
);

EditItemBar.propTypes = {
  polish: PropTypes.string,
  english: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  created: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  pageContext: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

EditItemBar.defaultProps = {
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
