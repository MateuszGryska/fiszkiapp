import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { children, loggedIn, profileData } = this.props;
    const { isMenubarVisible, isNewItemBarVisible } = this.state;

    return (
      <StyledWrapper>
        {loggedIn.uid ? (
          <>
            <Navbar loggedIn={loggedIn} handleOpen={this.toggleMenuBarVisible} />
            <Menubar
              loggedIn={loggedIn}
              profileData={profileData}
              isVisible={isMenubarVisible}
              handleClose={this.toggleMenuBarVisible}
            />
            {children}
            <AddButton loggedIn={loggedIn} onClick={this.toggleNewItemBarVisible} />
            <NewItemBar
              loggedIn={loggedIn}
              isVisible={isNewItemBarVisible}
              handleClose={this.toggleNewItemBarVisible}
            />
          </>
        ) : (
          <h1>you must log in</h1>
        )}
      </StyledWrapper>
    );
  }
}

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapStateToProps = ({ firebase }) => ({
  profileData: firebase.profile,
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(UserPageTemplate);
