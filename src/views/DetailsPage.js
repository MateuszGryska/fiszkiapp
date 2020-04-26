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
  };

  componentDidMount() {
    if (this.props.activeItem) {
      const [activeItem] = this.props.activeItem;
      this.setState({ activeItem });
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <DetailsTemplate
        title={activeItem.title}
        content={activeItem.content}
        created={activeItem.created}
      />
    );
  }
}

DetailsTemplate.propTypes = {
  activeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    activeItem: state[ownProps.pageContext].filter((item) => item.id === ownProps.match.params.id),
  };
};

export default withContext(connect(mapStateToProps)(DetailsPage));
