import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import EditItemBar from 'components/organisms/EditItemBar/EditItemBar';
import editIcon from 'assets/icons/edit-icon.svg';
import deleteIcon from 'assets/icons/delete-icon.svg';
import { removeItem as removeItemAction } from 'actions';

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

class TableItem extends Component {
  state = {
    isEditItemBarVisible: false,
  };

  toggleEditItemBarVisible = () => {
    this.setState((prevState) => ({
      isEditItemBarVisible: !prevState.isEditItemBarVisible,
    }));
  };

  render() {
    const { polish, english, id, removeItem } = this.props;
    const { isEditItemBarVisible } = this.state;

    return (
      <>
        <tr>
          <td>{polish}</td>
          <td>{english}</td>
          <StyledActions>
            <StyledButton secondary onClick={this.toggleEditItemBarVisible} />
            <StyledButton onClick={() => removeItem(words, id)} />
          </StyledActions>
          <EditItemBar
            polish={polish}
            english={english}
            isVisible={isEditItemBarVisible}
            handleClose={this.toggleEditItemBarVisible}
          />
        </tr>
      </>
    );
  }
}

TableItem.propTypes = {
  id: PropTypes.string.isRequired,
  polish: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(TableItem);
