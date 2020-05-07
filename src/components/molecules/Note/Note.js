import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditItemBar from 'components/organisms/EditItemBar/EditItemBar';
import WarningModal from 'components/molecules/WarningModal/WarningModal';
import styled from 'styled-components';
import ShowButton from 'components/atoms/ShowButton/ShowButton';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import { deleteItem as deleteItemAction, clean as cleanAction } from 'actions';

const notes = 'notes';

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  min-height: 250px;
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

const Note = ({ title, content, id, deleteItem, deleteError, cleanUp }) => {
  const [isEditItemBarVisible, setEditItemBarVisible] = useState(false);
  const [isDeleteWarningVisible, setDeleteWarningVisible] = useState(false);
  const MAX_LENGTH = 70;

  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledParagraph>{`${content.substring(0, MAX_LENGTH)}...`}</StyledParagraph>
      <ShowButton secondary="true" to={`notes/${id}`}>
        Show more
      </ShowButton>
      <StyledActionButtons>
        <ActionButton secondary onClick={() => setEditItemBarVisible(true)}>
          Edit
        </ActionButton>
        <ActionButton onClick={() => setDeleteWarningVisible(true)}>Remove</ActionButton>
      </StyledActionButtons>
      <EditItemBar
        title={title}
        content={content}
        id={id}
        isVisible={isEditItemBarVisible}
        handleClose={() => setEditItemBarVisible(false)}
      />
      <WarningModal
        item
        isVisible={isDeleteWarningVisible}
        handleClose={() => setDeleteWarningVisible()}
        id={id}
        deleteAction={() => deleteItem(notes, id)}
        error={deleteError}
        cleanUp={cleanUp}
      />
    </StyledWrapper>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  deleteError: auth.deleteUser.error,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
