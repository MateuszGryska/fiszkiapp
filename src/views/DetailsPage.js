import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';

class DetailsPage extends Component {
  state = {
    activeItem: {
      title: '',
      content: '',
      created: '',
    },
    isVisible: false,
  };
  /*eslint-disable */
  componentDidMount() {
    if (this.props.activeItem) {
      const [activeItem] = this.props.activeItem;
      this.setState({
        activeItem,
        isVisible: true,
      });
    }
  }
  /* eslint-enable */

  toggleVisible = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };

  render() {
    const { activeItem, isVisible } = this.state;

    return (
      <DetailsTemplate
        isVisible={isVisible}
        handleClose={this.toggleVisible}
        title={activeItem.title}
        content={activeItem.content}
        created={activeItem.created}
      />
    );
  }
}

DetailsTemplate.propTypes = {
  activeItem: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
};

DetailsTemplate.defaultProps = {
  activeItem: [],
};

const mapStateToProps = (state, ownProps) => {
  return {
    activeItem: state[ownProps.pageContext].filter((item) => item.id === ownProps.match.params.id),
  };
};

export default withContext(connect(mapStateToProps)(DetailsPage));
