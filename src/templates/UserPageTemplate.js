import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from 'components/atoms/Navbar/Navbar';
import PropTypes from 'prop-types';
import Menubar from 'components/organisms/Menubar/Menubar';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import addIcon from 'assets/icons/add-icon.svg';

const StyledWrapper = styled.div`
  padding-top: 70px;
  position: relative;
`;

const AddButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${addIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
  outline: none;
`;

class UserPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenubarVisible: false,
      isNewItemBarVisible: false,
    };
  }

  toggleMenuBarVisible = () => {
    this.setState((prevState) => ({
      isMenubarVisible: !prevState.isMenubarVisible,
    }));
  };

  toggleNewItemBarVisible = () => {
    this.setState((prevState) => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  render() {
    const { children } = this.props;
    const { isMenubarVisible, isNewItemBarVisible } = this.state;

    return (
      <StyledWrapper>
        <Navbar handleOpen={this.toggleMenuBarVisible} />
        <Menubar isVisible={isMenubarVisible} handleClose={this.toggleMenuBarVisible} />
        {children}
        <AddButton onClick={this.toggleNewItemBarVisible} />
        <NewItemBar isVisible={isNewItemBarVisible} handleClose={this.toggleNewItemBarVisible} />
      </StyledWrapper>
    );
  }
}

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
