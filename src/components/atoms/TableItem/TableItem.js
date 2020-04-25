import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import editIcon from 'assets/icons/edit-icon.svg';
import deleteIcon from 'assets/icons/delete-icon.svg';
import { removeItem as removeItemAction } from 'actions';

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

const TableItem = ({ polish, english, id, removeItem }) => (
  <>
    <tr>
      <td>{polish}</td>
      <td>{english}</td>
      <StyledActions>
        <StyledButton secondary />
        <StyledButton onClick={() => removeItem('words', id)} />
      </StyledActions>
    </tr>
  </>
);

TableItem.propTypes = {
  id: PropTypes.number.isRequired,
  polish: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(TableItem);
