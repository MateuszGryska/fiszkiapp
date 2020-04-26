import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShowButton from 'components/atoms/ShowButton/ShowButton';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import { removeItem as removeItemAction } from 'actions';

const notes = 'notes';

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  min-height: 350px;
  min-width: 400px;
  box-shadow: 0px 15px 20px 0 rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.main};
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledParagraph = styled.p`
  padding-top: 50px;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledActionButtons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 20px;
  left: 30px;
`;
const Note = ({ title, content, id, removeItem }) => (
  <StyledWrapper>
    <StyledTitle>{title}</StyledTitle>
    <StyledParagraph>{content}</StyledParagraph>
    <ShowButton secondary="true" to={`notes/${id}`}>
      Show more
    </ShowButton>
    <StyledActionButtons>
      <ActionButton secondary>Edit</ActionButton>
      <ActionButton onClick={() => removeItem(notes, id)}>Remove</ActionButton>
    </StyledActionButtons>
  </StyledWrapper>
);

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Note);
