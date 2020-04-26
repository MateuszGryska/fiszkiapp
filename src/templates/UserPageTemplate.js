import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from 'components/atoms/Navbar/Navbar';
import PropTypes from 'prop-types';
import Menubar from 'components/organisms/Menubar/Menubar';
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
`;

class UserPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenubarVisible: false,
    };
  }

  toggleMenuBarVisible = () => {
    this.setState((prevState) => ({
      isMenubarVisible: !prevState.isMenubarVisible,
    }));
  };

  render() {
    const { children } = this.props;
    const { isMenubarVisible } = this.state;

    return (
      <StyledWrapper>
        <Navbar handleOpen={this.toggleMenuBarVisible} />
        <Menubar isVisible={isMenubarVisible} handleClose={this.toggleMenuBarVisible} />
        {children}
        <AddButton />
      </StyledWrapper>
    );
  }
}

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
