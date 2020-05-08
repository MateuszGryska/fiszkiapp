import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import EditItemBar from 'components/organisms/EditItemBar/EditItemBar';
import WarningModal from 'components/molecules/WarningModal/WarningModal';
import editIcon from 'assets/icons/edit-icon.svg';
import deleteIcon from 'assets/icons/delete-icon.svg';
import { deleteItem as deleteItemAction, clean as cleanAction } from 'actions';

const words = 'words';

const StyledActions = styled.td`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  display: block;
  width: 35px;
  height: 35px;
  background-image: url(${deleteIcon});
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-size: 100% 70%;
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${({ secondary }) =>
    secondary &&
    css`
      background-image: url(${editIcon});
      margin-right: 5px;
    `}
`;

const TableItem = ({ polish, english, id, deleteItem, deleteError, cleanUp }) => {
  const [isEditItemBarVisible, setEditItemBarVisible] = useState(false);
  const [isDeleteWarningVisible, setDeleteWarningVisible] = useState(false);

  return (
    <>
      <tr>
        <td>{polish}</td>
        <td>{english}</td>
        <StyledActions>
          <StyledButton secondary onClick={() => setEditItemBarVisible(true)} />
          <StyledButton onClick={() => setDeleteWarningVisible(true)} />
        </StyledActions>
        <td>
          <EditItemBar
            id={id}
            polish={polish}
            english={english}
            isVisible={isEditItemBarVisible}
            handleClose={() => setEditItemBarVisible()}
          />
          <WarningModal
            item
            isVisible={isDeleteWarningVisible}
            handleClose={() => setDeleteWarningVisible()}
            id={id}
            deleteAction={() => deleteItem(words, id)}
            error={deleteError}
            cleanUp={cleanUp}
          />
        </td>
      </tr>
    </>
  );
};

TableItem.propTypes = {
  id: PropTypes.string.isRequired,
  polish: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
  cleanUp: PropTypes.func.isRequired,
};

TableItem.defaultProps = {
  deleteError: null,
};

const mapStateToProps = ({ auth }) => ({
  deleteError: auth.deleteUser.error,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
