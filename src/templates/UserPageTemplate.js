import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from 'components/atoms/Navbar/Navbar';
import PropTypes from 'prop-types';
import Menubar from 'components/organisms/Menubar/Menubar';

const StyledWrapper = styled.div`
  padding-top: 70px;
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
      </StyledWrapper>
    );
  }
}

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
